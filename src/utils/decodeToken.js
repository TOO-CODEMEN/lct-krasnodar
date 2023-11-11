const decodeBase64 = (str) => {
    const base64 = str.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export const decodeJWT = (token) => {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = decodeBase64(header);
    const decodedPayload = decodeBase64(payload);

    return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: signature
    };
}
