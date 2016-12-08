import React, {Component} from 'react';
// import DeckGL from 'deck.gl/react';
// import {LineLayer} from 'deck.gl';
import MapGL from 'react-map-gl';

const token = 'pk.eyJ1Ijoic2FtcGkiLCJhIjoiY2l3NWFhaWhoMDAweTJ0bzR6YzNnbjFoNiJ9.gfuh134ea9lH6Fy6mNkJkA';

export default class MovieMap extends Component {

  // state = {
  //   viewport: {
  //     latitude: 37.785164,
  //     longitude: -122.41669,
  //     zoom: 16.140440,
  //     bearing: -20.55991,
  //     pitch: 60,
  //   },
  //   width: 500,
  //   height: 500,
  // }

  render() {

		return (
			<MapGL
				width={400}
				height={400}
				latitude={37.7577}
				longitude={-122.4376}
				zoom={8}
				mapboxApiAccessToken={ token }
				onChangeViewport={viewport => {
					const {latitude, longitude, zoom} = viewport;
					// Optionally call `setState` and use the state to update the map.
				}}
			/>
		);

    // const {viewport, width, height} = this.state;

    // const layers = [new LineLayer({
    //   data: [{
    //     sourcePosition: [-122.41669, 37.7853],
    //     targetPosition: [-122.41669, 37.781],
    //   }],
    // })];
		//
    // return (
    //   <MapGL
    //     {...viewport}
    //     mapStyle="mapbox://styles/mapbox/dark-v9"
    //     onChangeViewport={v => this.setState({viewport: v})}
    //     preventStyleDiffing={false}
    //     mapboxApiAccessToken={token}
    //     perspectiveEnabled
    //     width={width}
    //     height={height}>
    //     <DeckGL
    //       {...viewport}
    //       width={width}
    //       height={height}
    //       layers={layers}
    //       debug />
    //   </MapGL>
    // );
  }

}
