const users = [];

const addUser = (id, name, room) => {
    const index = users.findIndex((user) => user.name == name);
    if (index != -1) {
        users[index].room = room;
        return;
    }
    const user = { id, name, room };

    users.push(user);
    return user;
};

const getUser = (id) => {
    let user = users.find((user) => user.id == id);
    return user;
};

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id == id);

    if (index !== -1) {
        const user = users[index];
        users.splice(index, 1);
        return user;
    }
    return null;
};

const getByUsername = (username) => {
    console.log("all", users);
    let decision = false;
    users.forEach((user) => {
        console.log(username, user.name);
        if (user.name === username) {
            console.log("decision  changed");
            decision = true;
        } else {
            console.log("decisoin remained");
        }
    });
    return decision;
};

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = {
    users,
    addUser,
    getUser,
    deleteUser,
    getUsers,
    getByUsername,
};
