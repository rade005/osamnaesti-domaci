export const LocalStorageEffect = (localStorageKey) => ({setSelf, onSet}) => {



    const savedValues = localStorage.getItem(localStorageKey);

    if (savedValues !== null) {
        setSelf(JSON.parse(savedValues));
    }

    onSet(newValue => {localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    });
}