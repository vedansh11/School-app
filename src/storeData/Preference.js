import DefaultPreference from 'react-native-default-preference';

export const SetData = (key, value) => {

    DefaultPreference.set(key, value);
}

export const GetData = (key) => {
    let result = DefaultPreference.get(key);
    return result;
}
export const ClearSingleData = (key) =>{
    DefaultPreference.clear(key);
}

export const ClearData = () => {
    DefaultPreference.clearAll();
}
