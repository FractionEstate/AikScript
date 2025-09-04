# test-smartcontracts

Write validators in the `validators` folder, and supporting functions in the `lib` folder using `.ak` as a file extension.

```aiken
validator my_first_validator {
  spend(_datum: Option<Data>, _redeemer: Data, _output_reference: Data, _context: Data) {
    True
  }
}
```

## Building

```sh
aiken build
```

## Configuring

Edit `aiken.toml` to configure your project.

## TypeScript Support

This project includes TypeScript support through AikScript. Write your contracts in TypeScript in the `typescript/validators/` directory and utility functions in `typescript/lib/`.

```sh
# Check and compile TypeScript contracts
aikscript check
aikscript build

# Create new contracts
aikscript new my-contract
```
