import axios from "axios";

//user host request
export const hostRequest = async hostData => {
    const url = `${process.env.REACT_APP_API_URL}/user/${hostData?.email}`;
    const { data } = await axios.put(url, hostData, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        }
    });
    // const res = await fetch(url, {
    //     method: 'PUT',
    //     headers: {

    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(hostData)
    // })
    // const data = await res.json();
    return data;
}

//user get role
export const getUserRole = async email => {
    const url = `${process.env.REACT_APP_API_URL}/user/${email}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        }
    })
    const user = await res.json();
    return user?.role;
}

//get all users
export const getAllUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        }
    });
    const data = await res.json();
    return data;
}

//make host
export const makeHost = async user => {
    delete user._id;
    const url = `${process.env.REACT_APP_API_URL}/user/${user?.email}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        },
        body: JSON.stringify({ ...user, role: 'host' })
    })
    const data = await res.json();
    return data;
}