class authMiddleware {
  static async checkJwt() {
    return 'JWT Checked';
  }

  static async checkCredentials() {
    return 'Credentials checked';
  }
}

export default authMiddleware;
