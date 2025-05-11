import { IUser } from '../types';
import { ValidationError } from '../utils/errors';

/**
 * User class representing a customer in the system
 */
export class User implements IUser {
    constructor(
        public id: number,
        private name: string,
        private email: string,
        private phone: number,
        private location: string
    ) {
        this.validateUser();
    }

    /**
     * Validates user data
     * @throws {ValidationError} if validation fails
     */
    private validateUser(): void {
        if (!this.name || this.name.trim() === '') {
            throw new ValidationError('Name is required');
        }
        if (!this.email || !this.isValidEmail(this.email)) {
            throw new ValidationError('Valid email is required');
        }
        if (!this.isValidPhone(this.phone)) {
            throw new ValidationError('Valid phone number is required');
        }
        if (!this.location || this.location.trim() === '') {
            throw new ValidationError('Location is required');
        }
    }

    /**
     * Validates email format
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validates phone number format
     */
    private isValidPhone(phone: number): boolean {
        return phone.toString().length >= 10;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPhone(): number {
        return this.phone;
    }

    getLocation(): string {
        return this.location;
    }

    /**
     * Updates user information
     * @throws {ValidationError} if validation fails
     */
    updateUser(name?: string, email?: string, phone?: number, location?: string): void {
        if (name) this.name = name;
        if (email) this.email = email;
        if (phone) this.phone = phone;
        if (location) this.location = location;
        this.validateUser();
    }

    /**
     * Returns a string representation of the user
     */
    toString(): string {
        return `${this.name} (${this.email})`;
    }
} 