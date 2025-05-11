import * as readline from 'readline'

export class InputManager {
    private rl: readline.Interface;
    
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async getInput(prompt: string): Promise<string> {
        try {
            return new Promise<string>((resolve, reject) => {
                this.rl.question(prompt, (answer) => {
                    if (!answer || answer.trim() === '') {
                        reject(new Error('Input cannot be empty'));
                    }
                    resolve(answer.trim());
                });
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to get input: ${error.message}`);
            }
            throw new Error('Failed to get input: Unknown error occurred');
        }
    }

    close(): void {
        this.rl.close();
    }
}