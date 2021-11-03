export default function geocode(vue,next) {
    let dat = vue.formData.data
    var addressObj = {
        address_line_1: dat.address,
        state:          dat.province,               
        country:        dat.country
    }
    vue.$geocoder.send(addressObj, response => { 
        let coordinates = {
            longitude:0,
            latitude:0
        }
        if (response.results.length>0){
            coordinates = {
                longitude:response.results[0].geometry.location.lng,
                latitude:response.results[0].geometry.location.lat
            }
        }
        next(coordinates)
    });
}