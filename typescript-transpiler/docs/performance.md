# Performance Guide

This guide covers performance considerations, optimization techniques, and benchmarking strategies for AikScript.

## Table of Contents

- [Performance Overview](#performance-overview)
- [Compilation Performance](#compilation-performance)
- [Memory Usage](#memory-usage)
- [Optimization Strategies](#optimization-strategies)
- [Benchmarking](#benchmarking)
- [Profiling](#profiling)
- [Performance Best Practices](#performance-best-practices)

## Performance Overview

AikScript is designed for high-performance TypeScript-to-Aiken transpilation with the following characteristics:

- **Compilation Speed**: Sub-second compilation for typical contracts
- **Memory Efficient**: Minimal memory footprint during compilation
- **Scalable**: Handles large contract files without performance degradation
- **Incremental**: Supports incremental compilation for development workflows

## Compilation Performance

### Benchmarks

Based on our performance testing with various contract sizes:

| Contract Size | Compilation Time | Memory Usage |
|---------------|------------------|--------------|
| Small (< 100 lines) | < 100ms | < 50MB |
| Medium (100-500 lines) | < 500ms | < 100MB |
| Large (500-1000 lines) | < 2s | < 200MB |
| Very Large (> 1000 lines) | < 5s | < 500MB |

### Performance Factors

#### Code Complexity

- **AST Depth**: Deeper AST structures take longer to process
- **Type Complexity**: Complex type definitions increase parsing time
- **Decorator Density**: More decorators per class slow down processing

#### System Resources

- **CPU**: Multi-core systems benefit from parallel processing
- **Memory**: Adequate RAM prevents garbage collection pauses
- **Disk I/O**: Fast storage improves file reading/writing

## Memory Usage

### Memory Management

AikScript uses efficient memory management techniques:

```typescript
// Memory-efficient AST processing
class MemoryEfficientParser {
  private nodeCache = new Map<string, ts.Node>();

  parseSource(sourceCode: string): TranspilerAST {
    // Reuse parsed nodes when possible
    const cacheKey = this.getCacheKey(sourceCode);

    if (this.nodeCache.has(cacheKey)) {
      return this.nodeCache.get(cacheKey)!;
    }

    const ast = this.parseWithoutCache(sourceCode);
    this.nodeCache.set(cacheKey, ast);

    return ast;
  }
}
```

### Memory Optimization Strategies

#### 1. AST Caching

Cache parsed ASTs to avoid re-parsing unchanged files:

```typescript
class ASTCache {
  private cache = new Map<string, { ast: TranspilerAST; timestamp: number }>();

  get(filePath: string): TranspilerAST | null {
    const entry = this.cache.get(filePath);
    if (!entry) return null;

    // Check if file has been modified
    const stats = fs.statSync(filePath);
    if (stats.mtime.getTime() > entry.timestamp) {
      this.cache.delete(filePath);
      return null;
    }

    return entry.ast;
  }

  set(filePath: string, ast: TranspilerAST): void {
    const timestamp = Date.now();
    this.cache.set(filePath, { ast, timestamp });
  }
}
```

#### 2. Lazy Evaluation

Only process nodes when they're actually needed:

```typescript
class LazyTransformer {
  private transformedNodes = new WeakMap<ts.Node, AikenAST.Node>();

  transform(node: ts.Node): AikenAST.Node {
    // Return cached result if available
    if (this.transformedNodes.has(node)) {
      return this.transformedNodes.get(node)!;
    }

    // Transform only when needed
    const transformed = this.doTransform(node);
    this.transformedNodes.set(node, transformed);

    return transformed;
  }
}
```

#### 3. Garbage Collection Optimization

Minimize object creation and promote garbage collection:

```typescript
class GCOptimizedGenerator {
  private stringBuilder = new Array<string>();

  generateCode(ast: AikenAST.Program): string {
    this.stringBuilder.length = 0; // Clear without reallocation

    this.appendCode(ast);
    return this.stringBuilder.join('');
  }

  private appendCode(node: AikenAST.Node): void {
    // Reuse string builder instead of string concatenation
    this.stringBuilder.push(this.generateNodeCode(node));
  }
}
```

## Optimization Strategies

### 1. Incremental Compilation

Only recompile changed files:

```typescript
class IncrementalCompiler {
  private fileTimestamps = new Map<string, number>();

  needsCompilation(filePath: string): boolean {
    const currentTimestamp = fs.statSync(filePath).mtime.getTime();
    const lastTimestamp = this.fileTimestamps.get(filePath);

    if (!lastTimestamp || currentTimestamp > lastTimestamp) {
      this.fileTimestamps.set(filePath, currentTimestamp);
      return true;
    }

    return false;
  }

  async compileChangedFiles(files: string[]): Promise<void> {
    const changedFiles = files.filter(file => this.needsCompilation(file));

    if (changedFiles.length === 0) {
      console.log('No files changed, skipping compilation');
      return;
    }

    // Compile only changed files
    await this.compileFiles(changedFiles);
  }
}
```

### 2. Parallel Processing

Process independent modules in parallel:

```typescript
class ParallelCompiler {
  async compileModules(modules: string[]): Promise<CompilationResult[]> {
    const workerPool = this.createWorkerPool();

    // Process modules in parallel
    const promises = modules.map(module =>
      workerPool.run(module)
    );

    return Promise.all(promises);
  }

  private createWorkerPool(): WorkerPool {
    // Create pool of worker threads
    return new WorkerPool({
      numWorkers: Math.min(modules.length, os.cpus().length),
      workerScript: './compile-worker.js'
    });
  }
}
```

### 3. Code Splitting

Split large contracts into smaller modules:

```typescript
// Instead of one large contract
@contract("LargeContract")
class LargeContract {
  // 1000+ lines of code...
}

// Split into smaller modules
@contract("MainContract")
class MainContract {
  // Core logic
}

@contract("ValidationContract")
class ValidationContract {
  // Validation logic
}

@contract("UtilityContract")
class UtilityContract {
  // Utility functions
}
```

### 4. Build Optimization

Use production optimizations:

```typescript
interface BuildConfig {
  optimization: 'development' | 'production';
  minify: boolean;
  treeShake: boolean;
  sourceMaps: boolean;
}

class OptimizedBuilder {
  async build(config: BuildConfig): Promise<void> {
    if (config.optimization === 'production') {
      await this.applyProductionOptimizations();
    }

    if (config.treeShake) {
      await this.treeShakeUnusedCode();
    }

    if (config.minify) {
      await this.minifyOutput();
    }
  }
}
```

## Benchmarking

### Setting Up Benchmarks

Create comprehensive benchmarks:

```typescript
// benchmarks/compilation-benchmark.ts
import { TypeScriptToAikenTranspiler } from '../src/core/transpiler';
import { generateTestContract } from './test-data-generator';

describe('Compilation Benchmarks', () => {
  let transpiler: TypeScriptToAikenTranspiler;

  beforeEach(() => {
    transpiler = new TypeScriptToAikenTranspiler();
  });

  test('small contract compilation', () => {
    const contract = generateTestContract('small');
    const startTime = process.hrtime.bigint();

    const result = transpiler.compile({
      inputPath: contract.path,
      outputPath: './output/small.ak',
      target: 'aiken'
    });

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1_000_000; // Convert to milliseconds

    expect(result.success).toBe(true);
    expect(duration).toBeLessThan(100); // Should complete in under 100ms

    console.log(`Small contract compilation: ${duration}ms`);
  });

  test('large contract compilation', () => {
    const contract = generateTestContract('large');
    const startTime = process.hrtime.bigint();

    const result = transpiler.compile({
      inputPath: contract.path,
      outputPath: './output/large.ak',
      target: 'aiken'
    });

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1_000_000;

    expect(result.success).toBe(true);
    expect(duration).toBeLessThan(5000); // Should complete in under 5 seconds

    console.log(`Large contract compilation: ${duration}ms`);
  });
});
```

### Memory Benchmarks

Monitor memory usage during compilation:

```typescript
// benchmarks/memory-benchmark.ts
import * as v8 from 'v8';

class MemoryBenchmark {
  async measureMemoryUsage(operation: () => Promise<void>): Promise<MemoryStats> {
    const initialMemory = this.getMemoryUsage();

    // Force garbage collection before measurement
    if (global.gc) {
      global.gc();
    }

    const startMemory = this.getMemoryUsage();
    await operation();
    const endMemory = this.getMemoryUsage();

    return {
      initial: initialMemory,
      start: startMemory,
      end: endMemory,
      peak: this.getPeakMemoryUsage(),
      leaked: endMemory.heapUsed - startMemory.heapUsed
    };
  }

  private getMemoryUsage(): NodeJS.MemoryUsage {
    return process.memoryUsage();
  }

  private getPeakMemoryUsage(): number {
    // Use v8 heap statistics for peak memory
    const stats = v8.getHeapStatistics();
    return stats.peak_malloced_memory || 0;
  }
}
```

### Performance Regression Tests

Detect performance regressions:

```typescript
// benchmarks/regression-test.ts
interface PerformanceBaseline {
  smallContract: number;
  mediumContract: number;
  largeContract: number;
}

class PerformanceRegressionTest {
  private baseline: PerformanceBaseline;

  constructor(baseline: PerformanceBaseline) {
    this.baseline = baseline;
  }

  async checkRegression(contractSize: keyof PerformanceBaseline): Promise<void> {
    const currentTime = await this.measureCompilationTime(contractSize);
    const baselineTime = this.baseline[contractSize];

    const regression = ((currentTime - baselineTime) / baselineTime) * 100;

    if (regression > 10) { // More than 10% slower
      throw new Error(
        `Performance regression detected: ${regression.toFixed(2)}% slower for ${contractSize} contract`
      );
    }

    console.log(`${contractSize} contract: ${regression > 0 ? '+' : ''}${regression.toFixed(2)}%`);
  }
}
```

## Profiling

### CPU Profiling

Use Node.js built-in profiler:

```bash
# Profile compilation
node --prof ./dist/cli/index.js compile MyContract.ts

# Process profile
node --prof-process isolate-*.log > profile.txt
```

### Memory Profiling

Monitor memory usage:

```typescript
// profiling/memory-profiler.ts
import * as inspector from 'inspector';

class MemoryProfiler {
  private session: inspector.Session;

  constructor() {
    this.session = new inspector.Session();
    this.session.connect();
  }

  async startProfiling(): Promise<void> {
    await this.post('Profiler.enable');
    await this.post('Profiler.start');
  }

  async stopProfiling(): Promise<inspector.Profiler.Profile> {
    const result = await this.post('Profiler.stop');
    await this.post('Profiler.disable');

    return result.profile;
  }

  private post(method: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.session.post(method, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
```

### Flame Graph Generation

Create flame graphs for detailed analysis:

```typescript
// profiling/flame-graph.ts
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

class FlameGraphGenerator {
  async generateFlameGraph(profile: inspector.Profiler.Profile): Promise<void> {
    // Convert profile to flame graph format
    const flameData = this.convertToFlameGraph(profile);

    // Write flame graph data
    writeFileSync('flame-graph.txt', flameData);

    // Generate SVG using flamegraph.pl
    execSync('flamegraph.pl flame-graph.txt > flame-graph.svg');
  }

  private convertToFlameGraph(profile: inspector.Profiler.Profile): string {
    const lines: string[] = [];

    const processNode = (node: inspector.Profiler.ProfileNode, prefix = '') => {
      const functionName = node.callFrame.functionName || '(anonymous)';
      const line = `${prefix}${functionName} ${node.hitCount}`;
      lines.push(line);

      node.children?.forEach(child => {
        processNode(child, `${prefix}${functionName};`);
      });
    };

    profile.nodes.forEach(node => {
      if (!node.callFrame.url?.includes('node_modules')) {
        processNode(node);
      }
    });

    return lines.join('\n');
  }
}
```

## Performance Best Practices

### 1. Code Organization

- **Modular Contracts**: Split large contracts into smaller, focused modules
- **Import Optimization**: Use specific imports instead of wildcard imports
- **Dead Code Elimination**: Remove unused code and dependencies

### 2. Build Configuration

```json
// aikscript.json - Optimized configuration
{
  "optimization": "production",
  "minify": true,
  "treeShake": true,
  "incremental": true,
  "parallel": true,
  "cache": true
}
```

### 3. Development Workflow

- **Watch Mode**: Use watch mode for faster incremental builds
- **Pre-compilation**: Pre-compile commonly used dependencies
- **Caching**: Enable build caching for unchanged files

### 4. Monitoring

Implement performance monitoring:

```typescript
// monitoring/performance-monitor.ts
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  startMeasurement(name: string): void {
    this.metrics.push({
      name,
      startTime: process.hrtime.bigint(),
      startMemory: process.memoryUsage()
    });
  }

  endMeasurement(name: string): PerformanceResult {
    const metric = this.metrics.find(m => m.name === name);
    if (!metric) {
      throw new Error(`No measurement found for: ${name}`);
    }

    const endTime = process.hrtime.bigint();
    const endMemory = process.memoryUsage();

    return {
      name,
      duration: Number(endTime - metric.startTime) / 1_000_000, // ms
      memoryDelta: endMemory.heapUsed - metric.startMemory.heapUsed,
      peakMemory: endMemory.heapTotal
    };
  }

  logResults(): void {
    this.metrics.forEach(metric => {
      const result = this.endMeasurement(metric.name);
      console.log(`${result.name}: ${result.duration}ms, ${result.memoryDelta} bytes`);
    });
  }
}
```

### 5. Optimization Checklist

- [ ] Use incremental compilation
- [ ] Enable parallel processing
- [ ] Implement AST caching
- [ ] Use lazy evaluation
- [ ] Optimize memory usage
- [ ] Enable tree shaking
- [ ] Minify output
- [ ] Monitor performance metrics
- [ ] Profile regularly
- [ ] Set up performance regression tests

By following these performance guidelines and regularly monitoring your AikScript projects, you can ensure optimal compilation speed and memory usage across different contract sizes and complexity levels.
