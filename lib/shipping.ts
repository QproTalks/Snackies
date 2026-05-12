export const shippingOptions = [
 {id:'nl_standard', label:'Netherlands standard parcel', amount:695, countries:['NL'], note:'Approx. PostNL/DPD consumer parcel baseline'},
 {id:'be_de_lu', label:'Belgium/Germany/Luxembourg standard parcel', amount:995, countries:['BE','DE','LU'], note:'Neighbouring EU parcel estimate'},
 {id:'eu_standard', label:'EU standard parcel', amount:1495, countries:['FR','ES','IT','AT','IE','PT','DK','SE','FI','PL','CZ','SK','HU','RO','BG','HR','SI','EE','LV','LT','GR'], note:'EU parcel estimate'},
 {id:'world_standard', label:'Worldwide standard parcel', amount:2995, countries:['US','GB','CA','AU','CN','JP','KR','MX','BR','CH','NO','TR','AE','SG','NZ'], note:'International parcel estimate'}
];
export const allowedShippingCountries = Array.from(new Set(shippingOptions.flatMap(s=>s.countries)));
