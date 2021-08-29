import axios from "axios";

// it is the base url to make any request ..if we make any request it get added after this url 
const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3"
});

export default instance;