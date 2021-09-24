class FakeUserService {
  user = null;
  users = [];
  login(username, password) {
    this.user = users.find(
      (u) => u.username == username && u.password == password
    );
  }
  currentUser() {
    return this.user;
  }
}

export const FakeUserService = new FakeUserService();
