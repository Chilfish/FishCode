interface Fish {
  uid: string | number;
  name: string;
}

function getUser(user: any) {
  console.log(user);
}

getUser({
  uid: 123,
});
let user2: number = 123;
