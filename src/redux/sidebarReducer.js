let initialState = {
    friends: [
        {id: 1, picture: 'https://stihi.ru/pics/2017/02/05/6700.jpg', name: 'Andrew'},
        {id: 2, picture: 'https://stihi.ru/pics/2017/02/05/6700.jpg', name: 'Sasha'},
        {id: 3, picture: 'https://stihi.ru/pics/2017/02/05/6700.jpg', name: 'Sveta'}
    ]
};

const sidebarReducer = (state = initialState, action) => {
    return state;
}

export default sidebarReducer;