import axios from 'axios';

export const fetchUsers = (queryKey: any) => {
    const [_, users] = queryKey.queryKey;
    return axios.get(
        `https://api.stackexchange.com/2.2/users?pagesize=${users}&order=desc&sort=reputation&site=stackoverflow`
    );
}