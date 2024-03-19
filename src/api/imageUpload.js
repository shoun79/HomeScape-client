export const getImageUrl = async image => {
    const formData = new FormData();
    formData.append('image', image);

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`;

    const res = await fetch(img_hosting_url, {
        method: 'POST',
        body: formData

    })
    const data = await res.json();

    return data.data.display_url;
}