export class UserDTO {
    constructor(user) {
        this._id = user._id || null;
        this.first_name = user.first_name || "";
        this.last_name = user.last_name || "";
        this.email = user.email || "";
        this.age = user.age || null;
        this.password = user.password || ""; 
        this.cart = user.cart || null;
        this.tickets = user.tickets || [];
        this.role = user.role || "user";
    }
}

export default UserDTO;
