import axios from "axios";
import { authHeader } from "../../helpers";

export const userService = {
    login,
    logout,
    register,
    getActive,
    update,
    firstCreate,
    resetPassword,
    postStatus,
    like,
    unlike
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`https://isay.gabatch11.my.id/user/login/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.setItem ('theme', 'light')
    localStorage.removeItem('theme');
}

 function getActive() {
    const requestOptions = {
        headers: authHeader()
    };

    // const user = JSON.parse(localStorage.getItem('user'));

    return axios.get (`https://isay.gabatch11.my.id/profile/getProfile`, requestOptions)
    // .then(handleResponse);
}

function register(email, password, confirmPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, confirmPassword})
    };

    return fetch(`https://isay.gabatch11.my.id/user/signup/`, requestOptions)
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user.data));

        return user;
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };


    //BENERIN BRO
    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
}


function firstCreate(location, activity, interest) {

    const activityString = JSON.stringify(activity)
    const interestString = JSON.stringify(interest)

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),
            'Content-Type': 'application/json' },
        body: JSON.stringify(
        {
            'interest': `${interestString}`,
            'location': `${location}`,
            'activity': `${activityString}`    
        })
    };
    
    return fetch(`https://isay.gabatch11.my.id/user/first_profile`, requestOptions)
        .then(handleResponse)
}


function resetPassword(emailReset) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),
            'Content-Type': 'application/json' },
        body:JSON.stringify(
        {
            'email': `${emailReset}`,
        })
    };

    return fetch(`https://isay.gabatch11.my.id/user/reset_password`, requestOptions)
        .then(handleResponse)
}

function postStatus(content, interestId, files) {

    // const user = JSON.parse(localStorage.getItem('user'));

    const images = files.map((i,x) => 
        URL.createObjectURL(files[x])
    )

    console.log("images", images)

    const formData = new FormData();
    formData.append('content', `${content}`);
    // formData.append('owner', `${user.id}`);
    formData.append('interest', `${interestId}`);
    // formData.append('media', images[0]);
    formData.append('media[]', files);
    // formData.append('media[]', files[1]);

    // if(images){
    //     if(images.length === 1){
    //         formData.append('media', images);
    //     } else {
    //         formData.append('media', images[0], 'files01.jpg');
    //         formData.append('media', images[1], 'files02.jpg');
    //     }
    // }
    console.log("inimedia", formData.get("media[]"))

    console.log("iniform", formData.get("content"), formData.get("owner"), formData.get("interest"))

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData
    };

    return fetch (`https://isay.gabatch11.my.id/status/`, requestOptions)
        .then(handleResponse)
}

function like(statusId) {

      const requestOptions = {
          method: 'PUT',
          headers: authHeader()
      };

      return fetch(`https://isay.gabatch11.my.id/status/like/${statusId}`, requestOptions)
        .then(handleResponse)
}

function unlike(statusId) {

      const requestOptions = {
          method: 'PUT',
          headers: authHeader()
      };

      return fetch(`https://isay.gabatch11.my.id/status/unlike/${statusId}`, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.text()
    .then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
