# Car Rental System

An improved car rental system implementation with better error handling, validation, and clean code practices.

## Features

- Vehicle inventory management
- User management
- Reservation system
- Date validation
- Overlapping reservation prevention
- Cost calculation
- Error handling
- Type safety with TypeScript

## Project Structure

```
src/
├── models/         # Domain models
├── services/       # Business logic
├── types/          # TypeScript interfaces and types
├── utils/          # Utility functions and error classes
└── index.ts        # Application entry point
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run the application:
   ```bash
   npm start
   ```

## Development

- Run in development mode:
  ```bash
  npm run dev
  ```

- Run tests:
  ```bash
  npm test
  ```

- Lint code:
  ```bash
  npm run lint
  ```

- Format code:
  ```bash
  npm run format
  ```

## Design Patterns Used

1. **Repository Pattern**
   - Vehicle inventory management
   - Reservation management

2. **Factory Pattern**
   - Vehicle creation
   - Reservation creation

3. **Singleton Pattern**
   - Store instance

4. **Observer Pattern**
   - Vehicle status updates
   - Reservation status updates

## Error Handling

The system includes comprehensive error handling for:
- Invalid inputs
- Business rule violations
- Resource not found
- Reservation conflicts
- System errors

## Type Safety

- Strong typing with TypeScript
- Interface-based design
- Enum usage for constants
- Null safety

## Testing

The project includes:
- Unit tests
- Integration tests
- Error case testing
- Edge case handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC 