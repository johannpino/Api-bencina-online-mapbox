class UI{
    constructor(){
        this.app = document.getElementById('app');
    }

    showBencina(results){

        const [,,calle,,,,comuna] = results;   

        const copy = [];
        results.forEach(dato => {
            const [actualizacion,,calle,,,,comuna,,region,,distribuidor,,logo,,gasolina93,gasolina97,diesel,gasolina95,,,lat,long] = dato;
            // const actualizacion = dato[1];
            // const calle = dato[3];           
            // const comuna = dato[6];
            // const region = dato[8];
            // const distribuidor = dato[10]; 
            // const logo = dato[12];
            // const gasolina93 = dato[14];
            // const gasolina97 = dato[15];
            // const diesel = dato[16];
            // const gasolina95 = dato[17];
            // const lat = Number(dato[20]);
            // const long =  Number(dato[21]);
            copy.push([long,lat, calle, actualizacion, comuna, region, distribuidor, logo, gasolina93, gasolina95, gasolina97, diesel])     
        });

        let result = copy;
        
        
        mapboxgl.accessToken = 'pk.eyJ1Ijoiam9oYW5ucGlubyIsImEiOiJjam1oMWQzczAxZWt1M3Ztem44ZzJ6Ym1zIn0.HAKD-bBWdM0jsqE5M_yCBw';
        let map = this.mapa;
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-70.6506, -33.4372],
            zoom: 13,
            });        
        map.addControl(new mapboxgl.NavigationControl());

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
        });

        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

        for (let i = 1; i < result.length; i++) {
            this.geojson = {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [result[i][0], result[i][1] ]
                  },
                  properties: {
                    title: result[i][6],
                    image: result[i][7],
                    description: `
                        <p> Calle: ${result[i][2]} </p>
                        <p> Region: ${result[i][5]} </p>
                        <p> Comuna: ${result[i][4]} </p>
                        <p> Ultima Actualizacion: ${result[i][3]} </p>
                        <p> Gasolina 93 : ${result[i][8]} </p>
                        <p> Gasolina 95 : ${result[i][9]} </p>
                        <p> Gasolina 97 : ${result[i][10]} </p>
                        <p> Diesel : ${result[i][11]} </p>
                    `
                  }
                }]
              };
            
            this.geojson.features.forEach( marker => {
                let el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`
                     <h3> ${marker.properties.title} <img src="${marker.properties.image}"   class="img-logo" > </h3>
                     <p> ${marker.properties.description} </p>
                `
                ))
                .addTo(map);
                });   
              
        }        
        
    }

    showMessage(message,classCss){
        const div = document.createElement('div');
        div.classList = classCss;
        div.appendChild(document.createTextNode(message))
        const content = document.querySelector('.row');
        
        content.insertBefore(div,this.app)
    }
}

module.exports = UI;