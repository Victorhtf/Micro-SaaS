class Auth {
  static checkUser() {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const isExpired = payload.exp && Date.now() >= payload.exp * 1000;

        if (isExpired) {
          console.log("Expired token");
          return false;
        }

        return true;
      } catch (e) {
        console.error("Error decoding token", e);
        return false;
      }
    }

    return false;
  }
}
