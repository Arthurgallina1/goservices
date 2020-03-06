import { takeLatest, call, put, all } from 'redux-saga/effects'
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { updateProfileSuccess, updateProfileFailure } from './actions';


export function* updateProfile({ payload }) {
    
   try { 
        const { name, avatar_id, email, ...rest } = payload.data;

        const profile = Object.assign(
            { name, email, avatar_id },
            rest.oldPassword ? rest : { }
        )

        const response = yield call(api.put, '/users', profile);
        toast.success('Profile updated!');
        yield put(updateProfileSuccess(response.data))

   } catch (err) { 
       toast.error('Error updating your profile, please check your information.')
       yield put(updateProfileFailure());
   }
}

export default all ([
    takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);