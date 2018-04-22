const ARTICLE = "@@ARTICLE";
const ARTICLE_CREATE_SUCCESS = `${ARTICLE}/CREATE_SUCCESS`;
const ARTICLE_LOADING = `${ARTICLE}/LOADING`;

const initialState = {
  article: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case ARTICLE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const createArticleSuccess = article => ({
  type: ARTICLE_CREATE_SUCCESS,
  payload: article
});

const articleLoading = loading => ({
  type: ARTICLE_LOADING,
  payload: loading
});

export const createArticle = url => {
  return dispatch => {
    dispatch(articleLoading(true));

    return setTimeout(() => {
      fetch(
        "/api/articles",
        { body: { url }, method: "POST" },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(json => {
          console.log(json);
          dispatch(articleLoading(false));
          dispatch(createArticleSuccess(json));
          return json;
        });
    }, 1000);
  };
};
