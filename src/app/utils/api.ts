

export const postData = async <T> (url:string = '',data:any={}):Promise <T> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json() as Promise<T>;
}