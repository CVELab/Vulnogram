function orderKeys(obj){var i,keys=Object.keys(obj).sort(function(k1,k2){return k1<k2?-1:k1>k2?1:0}),after={};for(i=0;i<keys.length;i++)after[keys[i]]=obj[keys[i]],delete obj[keys[i]];for(i=0;i<keys.length;i++)obj[keys[i]]=after[keys[i]],obj[keys[i]]instanceof Object&&(obj[keys[i]]=orderKeys(obj[keys[i]]));return obj}function cloneJSON(obj){if(null===obj||void 0===obj||"object"!=typeof obj||""===obj)return obj;if(obj instanceof Array){for(var cloneA=[],i=0;i<obj.length;++i)cloneA[i]=cloneJSON(obj[i]);return cloneA.length>0?cloneA:null}var cloneO={};for(var i in obj){var c=cloneJSON(obj[i]);null!==c&&""!==c&&(cloneO[i]=c)}return cloneO}function loadimg(e){var sibs=this.parentNode.parentNode.childNodes,f=sibs[1],ok=sibs[4];e.preventDefault();var file=this.files[0];if(file.size>528385)return alert("Image size should less than 500k"),!1;if(-1==file.type.indexOf("image"))return alert("Not an image!"),!1;var reader=new FileReader;return reader.onload=function(event){f.value=event.target.result,ok.click()},reader.readAsDataURL(file),!1}var textUtil={jsonView:function(obj){if(obj instanceof Array){var ret="<table>";for(var k in obj)ret=ret+"<tr><td>"+this.jsonView(obj)+"</td></tr>";return ret+"</table>"}if(obj instanceof Object){ret="<div>";for(var k in obj)obj.hasOwnProperty(k)&&(ret=ret+"<div><b>"+k+"</b>: "+this.jsonView(obj[k])+"</div>");return ret+"</div>"}return obj},reduceJSON:function(cve){var c=cloneJSON(cve);if(delete c.CNA_private,c.description&&c.description.description_data){var d,merged={};for(d of c.description.description_data)d&&d.lang&&(merged[d.lang]||(merged[d.lang]=[]),merged[d.lang].push(d.value));var new_d=[];for(var m in merged)new_d.push({lang:m,value:merged[m].join("\n")});c.description.description_data=new_d}return c.impact&&c.impact.cvss&&0===c.impact.cvss.baseScore&&delete c.impact,orderKeys(c)},getMITREJSON:function(cve){return JSON.stringify(cve,null,"    ")},getPR:function(cve){for(var m,matches=[],re=/PRs?[ \t]+((or|and|[0-9\t\ \,])+)/gim;null!==(m=re.exec(cve.solution));){var prs=m[1].trim().split(/[ \t,andor]{1,}/).filter(x=>x);matches=matches.concat(prs)}return matches},getAffectedProductString:function(cve){var status={};for(var vendor of cve.affects.vendor.vendor_data){var vendor_name=vendor.vendor_name;for(var product of vendor.product.product_data)for(var version of product.version.version_data){var vv=version.version_value,cat="affected";if(version.version_affected){version.version_affected.startsWith("?")?cat="unknown":version.version_affected.startsWith("!")&&(cat="unaffected");var prefix=product.product_name+" ";switch(version.version_name&&""!=version.version_name&&(prefix+=version.version_name+" "),version.version_affected){case"!":case"?":case"=":vv=version.version_value;break;case"<":case"!<":case"?<":vv=prefix+"versions earlier than "+version.version_value;break;case">":case"?>":vv=prefix+"versions later than "+version.version_value;break;case"<=":case"!<=":case"?<=":vv=product.product_name+" "+version.version_value+" and earlier versions";break;case">=":case"!>=":case"?>=":vv=product.product_name+" "+version.version_value+" and later versions";break;default:vv=version.version_value}}version.platform&&(vv=vv+" on "+version.platform),status[cat]||(status[cat]={}),status[cat][vendor_name+" "+product.product_name]||(status[cat][vendor_name+" "+product.product_name]=[]),status[cat][vendor_name+" "+product.product_name].push(vv)}}var stringifyArray=function(ob){var ret=[];for(var p in ob)ret.push(p+"\n"+ob[p].join(";\n")+".");return ret.join("\n")},ret=[];return status.affected&&ret.push("This issue affects:\n"+stringifyArray(status.affected)),status.unaffected&&ret.push("This issue does not affect:\n"+stringifyArray(status.unaffected)),status.unknown&&ret.push("It is not known whether this issue affects:\n"+stringifyArray(status.unknown)),ret.join("\n\n")},affectedTable:function(cve){var status={};for(var vendor of cve.affects.vendor.vendor_data){var vendor_name=vendor.vendor_name;for(var product of(status[vendor_name]||(status[vendor_name]={}),vendor.product.product_data)){var product_name=product.product_name;for(var version of(status[vendor_name][product_name]||(status[vendor_name][product_name]={}),product.version.version_data)){var vv=version.version_value,cat="affected";vn="";if(version.version_name&&""!=version.version_name&&(vn=version.version_name),version.version_affected)switch(version.version_affected.startsWith("?")?cat="unknown":version.version_affected.startsWith("!")&&(cat="unaffected"),version.version_affected){case"!":case"?":case"=":vv=version.version_value;break;case"<":case"!<":case"?<":vv="< "+version.version_value;break;case">":case"?>":vv="> "+version.version_value;break;case"<=":case"!<=":case"?<=":vv="<= "+version.version_value;break;case">=":case"!>=":case"?>=":vv=">= "+version.version_value;break;default:vv=version.version_value}version.platform&&""!=version.platform&&(vv+=" on "+version.platform),status[vendor_name][product_name][vn]||(status[vendor_name][product_name][vn]={}),status[vendor_name][product_name][vn][cat]||(status[vendor_name][product_name][vn][cat]=[]),status[vendor_name][product_name][vn][cat].push(vv)}}}return status},appliesTo:function(affects){var ret=[];for(var vendor of affects.vendor.vendor_data){vendor.vendor_name;for(var product of vendor.product.product_data){var product_name=product.product_name;for(var version of product.version.version_data){version.version_value,vn="";if(version.version_name&&""!=version.version_name&&(vn=version.version_name),version.version_affected)switch(version.version_affected.startsWith("?")?cat="unknown":version.version_affected.startsWith("!")&&(cat="no"),version.version_affected){case"=":case"<":case">":case"<=":case">=":ret.push(product_name+" "+vn)}}}}return ret},affectedYesNo:function(affects){var status={yes:[],no:[],unknown:[]};for(var vendor of affects.vendor.vendor_data){vendor.vendor_name;for(var product of vendor.product.product_data){var product_name=product.product_name;for(var version of product.version.version_data){var vv=version.version_value,cat="yes";vn="";if(version.version_name&&""!=version.version_name&&(vn=version.version_name),version.version_affected){switch(version.version_affected.startsWith("?")?cat="unknown":version.version_affected.startsWith("!")&&(cat="no"),version.version_affected){case"!":case"?":case"=":vv=version.version_value;break;case"<":case"!<":case"?<":vv="< "+version.version_value;break;case">":case"?>":vv="> "+version.version_value;break;case"<=":case"!<=":case"?<=":vv="<= "+version.version_value;break;case">=":case"!>=":case"?>=":vv=">= "+version.version_value;break;default:vv=version.version_value}version.platform&&""!=version.platform&&(vv+=" on "+version.platform)}var ph=status[cat][product_name];void 0==ph&&(ph=status[cat][product_name]={}),vns=ph.version_names,void 0==vns&&(vns=ph.version_names=[]),vns.indexOf(vn)<0&&vns.push(vn),vvs=ph.version_values,void 0==vvs&&(vvs=ph.version_values=[]),vvs.indexOf(vv)<0&&vvs.push(vv)}}}var rstatus={yes:[],no:[],unknown:[]};for(var cat of["yes","no","unknown"])for(var p in status[cat])rstatus[cat].push({product:p,version_names:status[cat][p].version_names,version_values:status[cat][p].version_values});return rstatus},mergeJSON:function(target,add){function isObject(obj){if("object"==typeof obj)for(var key in obj)if(obj.hasOwnProperty(key))return!0;return!1}for(var key in add)"__proto__"!==key&&"constructor"!==key&&add.hasOwnProperty(key)&&(target[key]&&isObject(target[key])&&isObject(add[key])?this.mergeJSON(target[key],add[key]):target[key]=add[key]);return target},timeSince:function(date){var seconds=Math.floor((new Date-date)/1e3),interval=Math.floor(seconds/31536e3);return interval>1?interval+" years":(interval=Math.floor(seconds/2592e3))>1?interval+" months":(interval=Math.floor(seconds/86400))>1?interval+" days":(interval=Math.floor(seconds/3600))>1?interval+" hours":(interval=Math.floor(seconds/60))>1?interval+" minutes":Math.floor(seconds)+" seconds"},nextPatchDay:function(dateString,weekday){for(var date=new Date(dateString),monthstogo=(12-date.getMonth())%3,count=0,idate=new Date(date.getFullYear(),date.getMonth()+monthstogo,1);idate.getDay()!==weekday||2!=++count;)idate.setDate(idate.getDate()+1);return idate<date?this.nextPatchDay(date.setMonth(date.getMonth()+1),weekday):idate},deep_value:function(obj,path){for(var ret=obj,i=0,len=(path=path.split(".")).length;i<len&&void 0!==(ret=ret[path[i]]);i++);return ret},getDocuments:async function(schemaName,ids,paths){const res=await fetch("/"+schemaName+"/json/",{method:"POST",credentials:"include",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},redirect:"error",body:JSON.stringify({ids:ids,fields:paths})});return await res.json()},diffline:function(line1,line2){for(var ret1=[],ret2=[],s=0,m=line1.length-1,n=line2.length-1;s<=m&&s<=n&&line1.charAt(s)==line2.charAt(s);)s++;for(;s<=m&&s<=n&&line1.charAt(m)==line2.charAt(n);)m--,n--;return s<=m?(ret1.push({t:0,str:line1.substring(0,s)}),ret1.push({t:1,str:line1.substring(s,m+1)}),ret1.push({t:0,str:line1.substring(m+1,line1.length)})):ret1.push({t:0,str:line1}),s<=n?(ret2.push({t:0,str:line2.substring(0,s)}),ret2.push({t:1,str:line2.substring(s,n+1)}),ret2.push({t:0,str:line2.substring(n+1,line2.length)})):ret2.push({t:0,str:line2}),{lhs:ret1,rhs:ret2}},fileSize:function(a,b,c,d,e){return(b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+" "+(e?"KMGTPEZY"[--e]+"B":"Bytes")}};"undefined"!=typeof module&&(module.exports=textUtil);var cvssjs={vectorMap:{attackVector:"AV",attackComplexity:"AC",privilegesRequired:"PR",userInteraction:"UI",scope:"S",confidentialityImpact:"C",integrityImpact:"I",availabilityImpact:"A"},vectorMap2:{accessVector:"AV",accessComplexity:"AC",authentication:"Au",confidentialityImpact:"C",integrityImpact:"I",availabilityImpact:"A"},Weight:{attackVector:{NETWORK:.85,ADJACENT_NETWORK:.62,LOCAL:.55,PHYSICAL:.2},attackComplexity:{HIGH:.44,LOW:.77},privilegesRequired:{UNCHANGED:{NONE:.85,LOW:.62,HIGH:.27},CHANGED:{NONE:.85,LOW:.68,HIGH:.5}},userInteraction:{NONE:.85,REQUIRED:.62},scope:{UNCHANGED:6.42,CHANGED:7.52},confidentialityImpact:{NONE:0,LOW:.22,HIGH:.56},integrityImpact:{NONE:0,LOW:.22,HIGH:.56},availabilityImpact:{NONE:0,LOW:.22,HIGH:.56}},vector:function(cvss){var r="CVSS:3.1";for(var m in cvss)this.vectorMap[m]&&cvss[m]&&(r+="/"+this.vectorMap[m]+":"+cvss[m].charAt(0));return r},vector2:function(cvss){var r=[];for(var m in cvss)this.vectorMap2[m]&&cvss[m]&&r.push(this.vectorMap2[m]+":"+cvss[m].charAt(0));return r.join("/")},CVSSseveritys:[{name:"NONE",bottom:0,top:0},{name:"LOW",bottom:.1,top:3.9},{name:"MEDIUM",bottom:4,top:6.9},{name:"HIGH",bottom:7,top:8.9},{name:"CRITICAL",bottom:9,top:10}],severityLevel:function(score){return 0==score?"NONE":score<=3.9?"LOW":score<=6.9?"MEDIUM":score<=8.9?"HIGH":"CRITICAL"},severity:function(score){var i,severityRatingLength=this.CVSSseveritys.length;for(i=0;i<severityRatingLength;i++)if(score>=this.CVSSseveritys[i].bottom&&score<=this.CVSSseveritys[i].top)return this.CVSSseveritys[i];return{name:"?",bottom:"Not",top:"defined"}},roundUp1:function(input){var int_input=Math.round(1e5*input);return int_input%1e4==0?int_input/1e5:(Math.floor(int_input/1e4)+1)/10},calculate:function(cvss){var p,val={},metricWeight={};try{for(p in this.Weight){if(val[p]=cvss[p],void 0===val[p]||""===val[p]||null==val[p])return"?";metricWeight[p]=this.Weight[p][val[p]]}}catch(err){return err}metricWeight.privilegesRequired=this.Weight.privilegesRequired[val.scope][val.privilegesRequired];try{var impactSubScore,impactSubScoreMultiplier=1-(1-metricWeight.confidentialityImpact)*(1-metricWeight.integrityImpact)*(1-metricWeight.availabilityImpact);return impactSubScore="UNCHANGED"===val.scope?metricWeight.scope*impactSubScoreMultiplier:metricWeight.scope*(impactSubScoreMultiplier-.029)-3.25*Math.pow(impactSubScoreMultiplier-.02,15),exploitabality=8.22*metricWeight.attackVector*metricWeight.attackComplexity*metricWeight.privilegesRequired*metricWeight.userInteraction,(impactSubScore<=0?0:"UNCHANGED"===val.scope?this.roundUp1(Math.min(exploitabality+impactSubScore,10)):this.roundUp1(Math.min(1.08*(exploitabality+impactSubScore),10))).toFixed(1)}catch(err){return err}},w2:{accessComplexity:{HIGH:.35,MEDIUM:.61,LOW:.71},authentication:{NONE:.704,SINGLE:.56,MULTIPLE:.45},accessVector:{LOCAL:.395,ADJACENT_NETWORK:.646,NETWORK:1},confidentialityImpact:{NONE:0,PARTIAL:.275,COMPLETE:.66},integrityImpact:{NONE:0,PARTIAL:.275,COMPLETE:.66},availabilityImpact:{NONE:0,PARTIAL:.275,COMPLETE:.66}},calculate2:function(cvss){var w2=this.w2,impact=10.41*(1-(1-w2.confidentialityImpact[cvss.confidentialityImpact])*(1-w2.integrityImpact[cvss.integrityImpact])*(1-w2.availabilityImpact[cvss.availabilityImpact]));return 0==impact?0:(1.176*(.6*impact+.4*(20*w2.accessComplexity[cvss.accessComplexity]*w2.authentication[cvss.authentication]*w2.accessVector[cvss.accessVector])-1.5)).toFixed(1)}};