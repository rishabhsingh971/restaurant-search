(window["webpackJsonprestaurant-search"]=window["webpackJsonprestaurant-search"]||[]).push([[0],{41:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},55:function(e,t,a){e.exports=a(67)},60:function(e,t,a){},61:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(11),s=a.n(i),r=(a(60),a(25)),c=a(16),l=a(26),h=a(27),p=a(6),m=a(31),d=a(41),u=a.n(d),g=(a(61),a(4)),f=a(96),b=a(97),_=a(99),v=a(98),k=a(100),w=a(108),y=Object(f.a)(function(e){return{card:function(e){return{display:"flex",width:"100%",height:e.height,"&:hover":{border:"black solid 1px",margin:-1}}},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto",padding:10},cover:function(e){return{width:e.height-10,flexShrink:0,padding:e.small?0:6}},controls:{display:"flex",alignItems:"center",paddingLeft:e.spacing(1),paddingBottom:e.spacing(1)},title:{lineHeight:1},rating:function(e){return{marginTop:e.small?4:8,display:"inline-flex"}},ratingText:{fontSize:12,marginLeft:6},address:{fontSize:13,margin:"4px 0px"}}});function C(e){var t=e.restaurant,a="small"===e.size,n=y({small:a,height:a?90:120});if(!t)return null;var i=t.name,s=t.photos,r=t.rating,c=t.user_ratings_total,l=t.icon,h=t.vicinity,p=s&&s[0]&&s[0].getUrl&&s[0].getUrl()||l;return o.a.createElement(b.a,{className:n.card},o.a.createElement(v.a,{className:n.cover,component:"img",title:i,image:p}),o.a.createElement("div",{className:n.details},o.a.createElement(_.a,{className:n.content},o.a.createElement(k.a,{component:"h6",variant:"h6",className:n.title},i),r&&o.a.createElement("div",{className:n.rating},o.a.createElement(w.a,{name:"rating",value:r,precision:.1,readOnly:!0,title:r.toFixed(1),size:"small"}),o.a.createElement(k.a,{className:n.ratingText,variant:"subtitle2",color:"textSecondary"},r.toFixed(1)," (",c,")")),h&&o.a.createElement(k.a,{className:n.address,variant:"body2"},h))))}function E(e){var t=e.place;return o.a.createElement("div",{id:"info-content"},o.a.createElement(C,{size:"small",restaurant:t}))}var S=a(101),W=a(107),O=a(68),R=a(29),x=a.n(R),I=a(46),L=a.n(I),M=Object(f.a)(function(e){return{root:{padding:"2px 4px",display:"flex",alignItems:"center",width:400,position:"absolute",top:10,left:0,right:0,margin:"auto",zIndex:"1"},input:{flex:1},searchButton:{padding:4},divider:{height:28,margin:4}}}),B=o.a.forwardRef(function(e,t){var a=e.placeholder,n=e.onCurrentLocationClick,i=M();return o.a.createElement(O.a,{className:i.root},o.a.createElement(S.a,{className:i.searchButton,"aria-label":"search"},o.a.createElement(x.a,null)),o.a.createElement(W.a,{id:"searchbox",className:i.input,placeholder:a,inputProps:{"aria-label":a},ref:t,type:"search"}),o.a.createElement(S.a,{className:i.searchButton,"aria-label":"current location search",onClick:n},o.a.createElement(L.a,null)))}),N=a(102),G=a(106),j=a(47),U=a.n(j);function J(e){return o.a.createElement(G.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:!!e.message,autoHideDuration:3e3,onClose:e.onClose,ContentProps:{"aria-describedby":"message-id"},message:o.a.createElement("span",{id:"message-id"},e.message),action:[o.a.createElement(S.a,{key:"close","aria-label":"close",color:"primary",onClick:e.onClose},o.a.createElement(U.a,null))]})}var P=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(h.a)(t).call(this,e))).searchBoxRef=o.a.createRef(),a.state={place:null,status:null},a.initMap=a.initMap.bind(Object(p.a)(a)),a.handlePlaceChange=a.handlePlaceChange.bind(Object(p.a)(a)),a.handleCurrentLocationSearch=a.handleCurrentLocationSearch.bind(Object(p.a)(a)),a.handleSnackbarClose=a.handleSnackbarClose.bind(Object(p.a)(a)),a.search=a.search.bind(Object(p.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=document.createElement("script");e.src="https://maps.googleapis.com/maps/api/js?key=".concat("","&libraries=places"),window.document.body.appendChild(e),e.addEventListener("load",this.initMap)}},{key:"initMap",value:function(){this.markers=[],this.MARKER_PATH="https://developers.google.com/maps/documentation/javascript/images/marker_green",this.map=this.createGoogleMap(),this.searchBox=this.createSearchBox(),this.places=new window.google.maps.places.PlacesService(this.map),this.infoWindow=new window.google.maps.InfoWindow({content:document.getElementById("info-content")});var e=this.props.dummyResults;e&&(this.map.panTo(e[0].geometry.location),this.map.setZoom(15),this.createMarkers(e),this.props.onResultsUpdate(e,this.markers))}},{key:"createGoogleMap",value:function(){return new window.google.maps.Map(document.getElementById("google-map"),{zoom:13,center:{lat:27,lng:77},mapTypeControl:!1,panControl:!0,zoomControl:!0,streetViewControl:!1})}},{key:"createSearchBox",value:function(){var e=this,t=this.searchBoxRef.current.childNodes[0],a=new window.google.maps.places.Autocomplete(t,{bounds:this.map.getBounds()});return this.map.addListener("bounds_changed",function(){a.setBounds(e.map.getBounds())}),a.addListener("place_changed",this.handlePlaceChange),a}},{key:"handlePlaceChange",value:function(e){if(e)this.map.panTo({lat:e.latitude,lng:e.longitude});else{var t=this.searchBox.getPlace();if(!t.geometry)return void this.setStatus("Location not found... please try again");this.map.panTo(t.geometry.location)}this.map.setZoom(16),this.search()}},{key:"search",value:function(){var e=this,t={bounds:this.map.getBounds(),types:["restaurant"]};this.places.nearbySearch(t,function(t,a){a===window.google.maps.places.PlacesServiceStatus.OK?(e.clearMarkers(),e.createMarkers(t),e.props.onResultsUpdate(t,e.markers)):a===window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS?e.setStatus("No results for given location... please try another location"):e.setStatus(a)})}},{key:"clearMarkers",value:function(){if(this.markers){for(var e=0;e<this.markers.length;e++)this.markers[e]&&this.markers[e].setMap(null);this.markers=[]}}},{key:"createMarkers",value:function(e){for(var t=0;t<e.length;t++){var a=String.fromCharCode("A".charCodeAt(0)+t%26),n=this.MARKER_PATH+a+".png";this.markers[t]=new window.google.maps.Marker({position:e[t].geometry.location,animation:window.google.maps.Animation.DROP,icon:n}),this.markers[t].placeResult=e[t],window.google.maps.event.addListener(this.markers[t],"mouseover",this.showInfoWindow.bind(this,t)),window.google.maps.event.addListener(this.markers[t],"mouseout",this.hideInfoWindow.bind(this,t)),window.google.maps.event.addListener(this.markers[t],"focus",this.startBounce.bind(this,t)),window.google.maps.event.addListener(this.markers[t],"blur",this.stopBounce.bind(this,t)),setTimeout(this.dropMarker(t),100*t)}}},{key:"startBounce",value:function(e){this.markers[e].setAnimation(window.google.maps.Animation.BOUNCE)}},{key:"stopBounce",value:function(e){this.markers[e].setAnimation(null)}},{key:"dropMarker",value:function(e){var t=this;return function(){t.markers&&t.markers[e].setMap(t.map)}}},{key:"showInfoWindow",value:function(e){var t=this.markers[e];this.setState({place:t.placeResult}),this.infoWindow.open(this.map,t)}},{key:"hideInfoWindow",value:function(){this.infoWindow.close()}},{key:"render",value:function(){var e=this.props.classes;return o.a.createElement("div",{id:"google-map-container",className:e.mapContainer},o.a.createElement(B,{ref:this.searchBoxRef,placeholder:"Search a location",onCurrentLocationClick:this.handleCurrentLocationSearch}),o.a.createElement("div",{id:"google-map",className:e.map}),o.a.createElement(E,{place:this.state.place}),o.a.createElement(N.a,{color:"primary",size:"medium",variant:"extended","aria-label":"search",className:e.fab,onClick:this.search},o.a.createElement(x.a,{className:e.searchIcon}),"Search this area"),o.a.createElement(J,{message:this.state.status,onClose:this.handleSnackbarClose}))}},{key:"handleCurrentLocationSearch",value:function(){var e=this;navigator.geolocation?(this.setStatus("Locating..."),navigator.geolocation.getCurrentPosition(function(t){var a=t.coords;return e.handlePlaceChange(a)},function(){return e.setStatus("Unable to retrieve your location... please try again.")})):this.setStatus("Geolocation is not supported by your browser")}},{key:"setStatus",value:function(e){this.setState({status:e})}},{key:"handleSnackbarClose",value:function(){this.setState({status:null})}}]),t}(o.a.Component),X=Object(g.a)({mapContainer:{position:"relative"},map:{height:"100vh"},fab:{position:"absolute",bottom:20,left:0,right:0,margin:"auto"},searchIcon:{marginRight:4}})(P),D=a(50),A=a(104),H=a(103),T=Object(f.a)(function(e){return{root:{maxHeight:"100%",overflowY:"auto",backgroundColor:e.palette.background.paper}}});function Q(e){var t=e.restaurants,a=e.onClick,n=e.onMouseEnter,i=e.onMouseLeave,s=T(),r=o.a.useState(null),c=Object(D.a)(r,2),l=c[0],h=c[1];return t?(t=t.map(function(e,t){return o.a.createElement(H.a,{key:e.id,alignItems:"flex-start",onClick:function(){h(t),a(t)},onMouseEnter:function(){return n(t)},onMouseLeave:function(){return i(t)},selected:l===t},o.a.createElement(C,{restaurant:e}))}),o.a.createElement(A.a,{className:s.root},t)):null}var K=a(105);var z=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(h.a)(t).call(this,e))).state={restaurants:[{geometry:{location:{lat:38.9059316,lng:-77.036856},viewport:{ha:{g:38.90458736970849,h:38.90728533029149},da:{g:-77.03813023029147,h:-77.03543226970851}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"4972e78b0cc712e9f3365ab2a1579576bef2e1f8",name:"The Jefferson",opening_hours:{},photos:[{height:2e3,html_attributions:['<a href="https://maps.google.com/maps/contrib/100555550922889591124/photos">The Jefferson</a>'],width:3e3}],place_id:"ChIJOYdIe7-3t4kREprpMMO1BKM",plus_code:{compound_code:"WX47+97 Washington, District of Columbia, United States",global_code:"87C4WX47+97"},price_level:4,rating:4.7,reference:"ChIJOYdIe7-3t4kREprpMMO1BKM",scope:"GOOGLE",types:["spa","lodging","bar","restaurant","food","point_of_interest","establishment"],user_ratings_total:430,vicinity:"1200 16th Street Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.906329,lng:-77.04191500000002},viewport:{ha:{g:38.9050515697085,h:38.90774953029149},da:{g:-77.04314738029154,h:-77.04044941970847}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"527596daf24639daa6b3261b34e6d876b46ee3ca",name:"Shake Shack",opening_hours:{},photos:[{height:2988,html_attributions:['<a href="https://maps.google.com/maps/contrib/106588545817010894558/photos">charles g</a>'],width:5312}],place_id:"ChIJK8BXfbi3t4kR1dPf6WP7Bgc",plus_code:{compound_code:"WX45+G6 Washington, District of Columbia, United States",global_code:"87C4WX45+G6"},price_level:2,rating:4.2,reference:"ChIJK8BXfbi3t4kR1dPf6WP7Bgc",scope:"GOOGLE",types:["restaurant","food","point_of_interest","store","establishment"],user_ratings_total:1989,vicinity:"1216 18th Street Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.90394069999999,lng:-77.0380103},viewport:{ha:{g:38.9024860197085,h:38.9051839802915},da:{g:-77.0393704802915,h:-77.03667251970853}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"ca4aa4f6d75ba4b5db907dd7bcc826fd7e3a68cf",name:"Barcode",opening_hours:{},photos:[{height:853,html_attributions:['<a href="https://maps.google.com/maps/contrib/101671454299514769261/photos">Barcode</a>'],width:1280}],place_id:"ChIJtZtGJ7-3t4kR4_v7WdDfvFQ",plus_code:{compound_code:"WX36+HQ Washington, District of Columbia, United States",global_code:"87C4WX36+HQ"},price_level:2,rating:3.8,reference:"ChIJtZtGJ7-3t4kR4_v7WdDfvFQ",scope:"GOOGLE",types:["night_club","bar","restaurant","food","point_of_interest","establishment"],user_ratings_total:915,vicinity:"1101 17th Street Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.9084863,lng:-77.03172189999998},viewport:{ha:{g:38.9071421697085,h:38.9098401302915},da:{g:-77.03318333029154,h:-77.03048536970846}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",id:"a4dc02742506b8e6df5b5ebdaecd037a13df0336",name:"ChurchKey",opening_hours:{},photos:[{height:682,html_attributions:['<a href="https://maps.google.com/maps/contrib/118082854256050169480/photos">ChurchKey</a>'],width:1024}],place_id:"ChIJEeAiX-q3t4kR-VwuFaxkRxM",plus_code:{compound_code:"WX59+98 Washington, District of Columbia, United States",global_code:"87C4WX59+98"},price_level:2,rating:4.5,reference:"ChIJEeAiX-q3t4kR-VwuFaxkRxM",scope:"GOOGLE",types:["bar","night_club","restaurant","food","point_of_interest","establishment"],user_ratings_total:1523,vicinity:"1337 14th Street Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.9043232,lng:-77.0331865},viewport:{ha:{g:38.9029689697085,h:38.9056669302915},da:{g:-77.03431163029148,h:-77.03161366970846}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"ead9d8d3d7b8b7f7c15caed29a915fc1ac5669ff",name:"Lincoln",opening_hours:{},photos:[{height:3840,html_attributions:['<a href="https://maps.google.com/maps/contrib/107079900094154375828/photos">Fanette Rickert</a>'],width:5760}],place_id:"ChIJxUmtY5W3t4kRc6DhUq_pEdc",plus_code:{compound_code:"WX38+PP Washington, District of Columbia, United States",global_code:"87C4WX38+PP"},price_level:2,rating:4.1,reference:"ChIJxUmtY5W3t4kRc6DhUq_pEdc",scope:"GOOGLE",types:["bar","restaurant","food","point_of_interest","establishment"],user_ratings_total:760,vicinity:"1110 Vermont Avenue Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.9032169,lng:-77.0401812},viewport:{ha:{g:38.9021393197085,h:38.9048372802915},da:{g:-77.04165278029149,h:-77.03895481970847}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"9c883f6002cb9785b5c5c93151bfbcdf2d018c19",name:"Morton's The Steakhouse",opening_hours:{},photos:[{height:1179,html_attributions:['<a href="https://maps.google.com/maps/contrib/105207117816283634559/photos">Morton&#39;s The Steakhouse</a>'],width:1766}],place_id:"ChIJL91LFrm3t4kR_cddUSMqf9Q",plus_code:{compound_code:"WX35+7W Washington, District of Columbia, United States",global_code:"87C4WX35+7W"},price_level:4,rating:4.4,reference:"ChIJL91LFrm3t4kR_cddUSMqf9Q",scope:"GOOGLE",types:["restaurant","food","point_of_interest","establishment"],user_ratings_total:297,vicinity:"1050 Connecticut Avenue Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.9018744,lng:-77.03476409999996},viewport:{ha:{g:38.9005262697085,h:38.9032242302915},da:{g:-77.03602188029151,h:-77.0333239197085}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"c8295afa228819f7eec819d19c7007dfa3942574",name:"Georgia Brown's",opening_hours:{},photos:[{height:1600,html_attributions:['<a href="https://maps.google.com/maps/contrib/109222653044721960894/photos">Georgia Brown&#39;s</a>'],width:2400}],place_id:"ChIJweENE763t4kRpfaSKMj6tOs",plus_code:{compound_code:"WX28+P3 Washington, District of Columbia, United States",global_code:"87C4WX28+P3"},price_level:2,rating:4.3,reference:"ChIJweENE763t4kRpfaSKMj6tOs",scope:"GOOGLE",types:["bar","restaurant","food","point_of_interest","establishment"],user_ratings_total:1696,vicinity:"950 15th Street Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.911365,lng:-77.03166349999998},viewport:{ha:{g:38.9100340197085,h:38.9127319802915},da:{g:-77.03315473029147,h:-77.03045676970851}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"59313e3b719330313ffb0f8165cf12181a4c761e",name:"Le Diplomate",opening_hours:{},photos:[{height:667,html_attributions:['<a href="https://maps.google.com/maps/contrib/107402919288897989681/photos">Le Diplomate</a>'],width:1e3}],place_id:"ChIJgYIki-m3t4kRZImvuN_pp9Q",plus_code:{compound_code:"WX69+G8 Washington, District of Columbia, United States",global_code:"87C4WX69+G8"},price_level:3,rating:4.6,reference:"ChIJgYIki-m3t4kRZImvuN_pp9Q",scope:"GOOGLE",types:["cafe","bar","restaurant","food","point_of_interest","establishment"],user_ratings_total:2852,vicinity:"1601 14th Street Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.9078402,lng:-77.04210999999998},viewport:{ha:{g:38.9064774197085,h:38.9091753802915},da:{g:-77.04354963029152,h:-77.0408516697085}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"16f51b209507801d3d07682a1d47af379b94ef96",name:"Madhatter",opening_hours:{},photos:[{height:1e3,html_attributions:['<a href="https://maps.google.com/maps/contrib/113719639442868633401/photos">Ashley Hughes</a>'],width:1500}],place_id:"ChIJWZL8dce3t4kR8dQsbgQBnm0",plus_code:{compound_code:"WX55+45 Washington, District of Columbia, United States",global_code:"87C4WX55+45"},price_level:2,rating:4,reference:"ChIJWZL8dce3t4kR8dQsbgQBnm0",scope:"GOOGLE",types:["bar","restaurant","food","point_of_interest","establishment"],user_ratings_total:1326,vicinity:"1319 Connecticut Avenue Northwest, Washington",html_attributions:[]},{geometry:{location:{lat:38.9009528,lng:-77.03864069999997},viewport:{ha:{g:38.8996411197085,h:38.9023390802915},da:{g:-77.03988428029152,h:-77.0371863197085}}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",id:"95b2b0a2bd0fdea7687bb9c8340216abd130998b",name:"Equinox Restaurant",opening_hours:{},photos:[{height:808,html_attributions:['<a href="https://maps.google.com/maps/contrib/114488018154359375079/photos">Equinox Restaurant</a>'],width:1440}],place_id:"ChIJt6jHBLy3t4kRI2hxAOiO8fw",plus_code:{compound_code:"WX26+9G Washington, District of Columbia, United States",global_code:"87C4WX26+9G"},price_level:3,rating:4.5,reference:"ChIJt6jHBLy3t4kRI2hxAOiO8fw",scope:"GOOGLE",types:["restaurant","food","point_of_interest","establishment"],user_ratings_total:381,vicinity:"818 Connecticut Avenue Northwest, Washington",html_attributions:[]}],markers:null},a.handleRestaurantClick=a.handleRestaurantClick.bind(Object(p.a)(a)),a.handleRestaurantHover=a.handleRestaurantHover.bind(Object(p.a)(a)),a.handleRestaurantsUpdate=a.handleRestaurantsUpdate.bind(Object(p.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(K.a,{container:!0,spacing:0,style:{height:"100vh"}},o.a.createElement(K.a,{item:!0,xs:3,style:{maxHeight:"100%",display:"flex",flexDirection:"column"}},o.a.createElement(K.a,{container:!0,className:"header"},o.a.createElement("img",{className:"logo",xs:3,src:u.a,alt:"logo"}),o.a.createElement("span",{className:"name",xs:9},"Restaurant Search")),o.a.createElement(Q,{restaurants:this.state.restaurants,onClick:this.handleRestaurantClick,onMouseEnter:function(t){return e.handleRestaurantHover(t,!0)},onMouseLeave:function(t){return e.handleRestaurantHover(t,!1)}})),o.a.createElement(K.a,{item:!0,xs:9},o.a.createElement(X,{dummyResults:this.state.restaurants,onResultsUpdate:this.handleRestaurantsUpdate})))}},{key:"handleRestaurantClick",value:function(e){window.google&&window.google.maps.event.trigger(this.state.markers[e],"click")}},{key:"handleRestaurantHover",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];window.google&&window.google.maps.event.trigger(this.state.markers[e],t?"focus":"blur")}},{key:"handleRestaurantsUpdate",value:function(e,t){this.setState({restaurants:e,markers:t})}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[55,1,2]]]);
//# sourceMappingURL=main.5a4e5921.chunk.js.map