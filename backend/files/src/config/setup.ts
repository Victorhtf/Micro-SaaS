import dotenv from 'dotenv';

export default class Setup {
  static NODE_ENV: string;
  static SERVER_PORT: string;

  static load(): void {
    dotenv.config();
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.SERVER_PORT = process.env.PORT || '3000';

    this.validateVariables();
  }

  private static validateVariables(): void {
    const requiredVariables: Array<keyof typeof Setup> = [
      'NODE_ENV',
      'SERVER_PORT',
    ];

    for (const variable of requiredVariables) {
      if (!this[variable]) {
        const error = `[ENV] ${variable} is not defined in .env`;

        throw new Error(error);
      }
    }
  }
}
