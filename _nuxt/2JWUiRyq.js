import{_ as y}from"./ZKbjHqSP.js";import{_ as D}from"./CE7xdqeZ.js";import{u as h}from"./tVchZeTB.js";import{_ as x,s as f,o as r,c as s,a as e,t as l,u as c,b as d,w as m,F as k,f as w,d as S}from"./CptVdkvL.js";const v={class:"container"},W={class:"left"},B={class:"right"},L=["src","alt"],N={__name:"DayWeather",props:["index"],setup(t){function i(a){if(a===1)return"Today";let o=new Date;return o.setDate(o.getDate()+a-1),o.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}const n=h(),{weatherData:_}=f(n);return(a,o)=>(r(),s("div",v,[e("div",W,[e("h4",null,l(i(t.index)),1),e("h6",null,l(c(n).getWeatherDescription(t.index-1,"daily")),1)]),e("div",B,[e("img",{class:"monochromatic",src:c(n).getIconPath(t.index-1,"daily"),alt:c(n).getWeatherDescription(t.index-1,"daily")},null,8,L),e("h3",null,l(Math.round(c(_).daily.temperature2mMax[t.index-1]))+"°C ",1)])]))}},b=x(N,[["__scopeId","data-v-da1df790"]]),I={key:0},T={key:1},V={__name:"Weekly",setup(t){const i=h(),{weatherData:n}=f(i);return(_,a)=>{const o=y,u=D,p=b;return r(),s("article",null,[e("header",null,[d(u,{reversed:!0},{default:m(()=>[d(o,{to:"/"},{default:m(()=>a[0]||(a[0]=[S("Back")])),_:1})]),_:1})]),c(n)?(r(),s("ul",I,[(r(),s(k,null,w(7,g=>e("li",null,[d(p,{index:g},null,8,["index"])])),64))])):(r(),s("div",T,"Loading..."))])}}},A=x(V,[["__scopeId","data-v-bb725c7d"]]);export{A as default};
