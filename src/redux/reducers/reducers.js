import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import userReducer from './user.reducers'
import productReducer from './product.reducers';
import orderReducer from './order.reducers';
import categoryReducer from './category.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer,
});

export default rootReducer;