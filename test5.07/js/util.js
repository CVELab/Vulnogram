function orderKeys(obj){var i,keys=Object.keys(obj).sort(function(k1,k2){return k1<k2?-1:k1>k2?1:0}),after={};for(i=0;i<keys.length;i++)after[keys[i]]=obj[keys[i]],delete obj[keys[i]];for(i=0;i<keys.length;i++)obj[keys[i]]=after[keys[i]],obj[keys[i]]instanceof Object&&(obj[keys[i]]=orderKeys(obj[keys[i]]));return obj}function cloneJSON(obj){if(null===obj||void 0===obj||"object"!=typeof obj||""===obj)return obj;if(obj instanceof Array){for(var cloneA=[],i=0;i<obj.length;++i)cloneA[i]=cloneJSON(obj[i]);return cloneA.length>0?cloneA:null}var cloneO={};for(var i in obj){var c=cloneJSON(obj[i]);null!==c&&""!==c&&(cloneO[i]=c)}return cloneO}var textUtil={jsonView:function(obj){if(obj instanceof Array){var ret="<table>";for(var k in obj)ret=ret+"<tr><td>"+this.jsonView(obj)+"</td></tr>";return ret+"</table>"}if(obj instanceof Object){ret="<div>";for(var k in obj)obj.hasOwnProperty(k)&&(ret=ret+"<div><b>"+k+"</b>: "+this.jsonView(obj[k])+"</div>");return ret+"</div>"}return obj},reduceJSON:function(cve){var c=cloneJSON(cve);if(delete c.CNA_private,c.description&&c.description.description_data){var d,merged={};for(d of c.description.description_data)d&&d.lang&&(merged[d.lang]||(merged[d.lang]=[]),merged[d.lang].push(d.value));var new_d=[];for(var m in merged)new_d.push({lang:m,value:merged[m].join("\n")});c.description.description_data=new_d}return c.impact&&c.impact.cvss&&0===c.impact.cvss.baseScore&&delete c.impact,orderKeys(c)},getMITREJSON:function(cve){return JSON.stringify(cve,null,"    ")},getPR:function(cve){for(var m,matches=[],re=/PRs?[ \t]+((or|and|[0-9\t\ \,])+)/gim;null!==(m=re.exec(cve.solution));){var prs=m[1].trim().split(/[ \t,andor]{1,}/).filter(x=>x);matches=matches.concat(prs)}return matches},getProductList:function(cve){var lines=[];for(var vendor of cve.affects.vendor){var pstring=[];for(var product of vendor.product)pstring.push(product.product_name);lines.push(vendor.vendor_name+" "+pstring.join(", "))}return lines.join("; ")},getAffectedProductString:function(cve){var status={};for(var vendor of cve.affects.vendor){var vendor_name=vendor.vendor_name;for(var product of vendor.product)for(var version of product.version){var vv=version.version_value,cat="affected";if(version.version_affected){version.version_affected.startsWith("?")?cat="unknown":version.version_affected.startsWith("!")&&(cat="unaffected");var prefix="";switch(version.version_name&&""!=version.version_name&&(prefix=version.version_name+" "),version.version_affected){case"!":case"?":case"=":vv=version.version_value;break;case"<":case"!<":case"?<":vv=prefix+"versions prior to "+version.version_value;break;case">":case"?>":vv=prefix+"versions later than "+version.version_value;break;case"<=":case"!<=":case"?<=":vv=prefix+"version "+version.version_value+" and prior versions";break;case">=":case"!>=":case"?>=":vv=prefix+"version "+version.version_value+" and later versions";break;default:vv=version.version_value}}version.platform&&(vv=vv+" on "+version.platform),status[cat]||(status[cat]={}),status[cat][vendor_name+" "+product.product_name]||(status[cat][vendor_name+" "+product.product_name]=[]),status[cat][vendor_name+" "+product.product_name].push(vv)}}var stringifyArray=function(ob){var ret=[];for(var p in ob)ret.push(p+"\n"+ob[p].join(";\n")+".");return ret.join("\n")},ret=[];return status.affected&&ret.push("This issue affects:\n"+stringifyArray(status.affected)),status.unaffected&&ret.push("This issue does not affect:\n"+stringifyArray(status.unaffected)),status.unknown&&ret.push("It is not known whether this issue affects:\n"+stringifyArray(status.unknown)),ret.join("\n\n")},getProductAffected:function(cve){var lines=[];for(var vendor of cve.affects.vendor){var pstring=[];for(var product of vendor.product){var versions={},includePlatforms=!0,platforms={};for(var version of product.version)if(version.version_affected&&version.version_affected.indexOf("!")<0&&version.version_affected.indexOf("?")<0&&(versions[version.version_name]=1,"all"!=version.platform&&""!=version.platform||(includePlatforms=!1),includePlatforms&&version.platform)){var ps=version.platform.split(",");for(var p of ps)platforms[p.trim()]=!0}pstring.push("This issue affects "+product.product_name+" "+Object.keys(versions).sort().join(", ")+"."),includePlatforms&&Object.keys(platforms).length>0&&pstring.push("Affected platforms: "+Object.keys(platforms).sort().join(", ")+".")}lines.push(pstring.join(" "))}return lines.join()},getProblemTypeString:function(o){for(var pts=[],j=0;j<o.problemtype.problemtype_data.length;j++)for(var k=0;k<o.problemtype.problemtype_data[j].description.length;k++)if("eng"==o.problemtype.problemtype_data[j].description[k].lang){var pt=o.problemtype.problemtype_data[j].description[k].value;pt&&pts.push(pt.replace(/^CWE-[0-9 ]+/,""))}return pts.join(", ")},getBestTitle:function(o){var title=textUtil.deep_value(o,"CVE_data_meta.TITLE");return title||(title=textUtil.getProblemTypeString(o)+" vulnerability in "+textUtil.getProductList(o)),title},mergeJSON:function(target,add){function isObject(obj){if("object"==typeof obj)for(var key in obj)if(obj.hasOwnProperty(key))return!0;return!1}for(var key in add)add.hasOwnProperty(key)&&(target[key]&&isObject(target[key])&&isObject(add[key])?this.mergeJSON(target[key],add[key]):target[key]=add[key]);return target},timeSince:function(date){var seconds=Math.floor((new Date-date)/1e3),interval=Math.floor(seconds/31536e3);return interval>1?interval+" years":(interval=Math.floor(seconds/2592e3))>1?interval+" months":(interval=Math.floor(seconds/86400))>1?interval+" days":(interval=Math.floor(seconds/3600))>1?interval+" hours":(interval=Math.floor(seconds/60))>1?interval+" minutes":Math.floor(seconds)+" seconds"},nextPatchDay:function(dateString,weekday){for(var date=new Date(dateString),monthstogo=(12-date.getMonth())%3,count=0,idate=new Date(date.getFullYear(),date.getMonth()+monthstogo,1);idate.getDay()!==weekday||2!=++count;)idate.setDate(idate.getDate()+1);return idate<date?this.nextPatchDay(date.setMonth(date.getMonth()+1),weekday):idate},deep_value:function(obj,path){for(var ret=obj,i=0,len=(path=path.split(".")).length;i<len&&void 0!==(ret=ret[path[i]]);i++);return ret},getDocuments:async function(schemaName,ids,paths){const res=await fetch("/"+schemaName+"/json/",{method:"POST",credentials:"include",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},redirect:"error",body:JSON.stringify({ids:ids,fields:paths})});return await res.json()},diffline:function(line1,line2){for(var ret1=[],ret2=[],s=0,m=line1.length-1,n=line2.length-1;s<=m&&s<=n&&line1.charAt(s)==line2.charAt(s);)s++;for(;s<=m&&s<=n&&line1.charAt(m)==line2.charAt(n);)m--,n--;return s<=m?(ret1.push({t:0,str:line1.substring(0,s)}),ret1.push({t:1,str:line1.substring(s,m+1)}),ret1.push({t:0,str:line1.substring(m+1,line1.length)})):ret1.push({t:0,str:line1}),s<=n?(ret2.push({t:0,str:line2.substring(0,s)}),ret2.push({t:1,str:line2.substring(s,n+1)}),ret2.push({t:0,str:line2.substring(n+1,line2.length)})):ret2.push({t:0,str:line2}),{lhs:ret1,rhs:ret2}},fileSize:function(a,b,c,d,e){return(b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+" "+(e?"KMGTPEZY"[--e]+"B":"Bytes")}};"undefined"!=typeof module&&(module.exports=textUtil);var cvssjs={vectorMap:{attackVector:"AV",attackComplexity:"AC",privilegesRequired:"PR",userInteraction:"UI",scope:"S",confidentialityImpact:"C",integrityImpact:"I",availabilityImpact:"A"},Weight:{attackVector:{NETWORK:.85,ADJACENT_NETWORK:.62,LOCAL:.55,PHYSICAL:.2},attackComplexity:{HIGH:.44,LOW:.77},privilegesRequired:{UNCHANGED:{NONE:.85,LOW:.62,HIGH:.27},CHANGED:{NONE:.85,LOW:.68,HIGH:.5}},userInteraction:{NONE:.85,REQUIRED:.62},scope:{UNCHANGED:6.42,CHANGED:7.52},confidentialityImpact:{NONE:0,LOW:.22,HIGH:.56},integrityImpact:{NONE:0,LOW:.22,HIGH:.56},availabilityImpact:{NONE:0,LOW:.22,HIGH:.56}},vector:function(cvss){var r="CVSS:3.1";for(var m in cvss)this.vectorMap[m]&&cvss[m]&&(r+="/"+this.vectorMap[m]+":"+cvss[m].charAt(0));return r},CVSSseveritys:[{name:"NONE",bottom:0,top:0},{name:"LOW",bottom:.1,top:3.9},{name:"MEDIUM",bottom:4,top:6.9},{name:"HIGH",bottom:7,top:8.9},{name:"CRITICAL",bottom:9,top:10}],severityLevel:function(score){return 0==score?"NONE":score<=3.9?"LOW":score<=6.9?"MEDIUM":score<=8.9?"HIGH":"CRITICAL"},severity:function(score){var i,severityRatingLength=this.CVSSseveritys.length;for(i=0;i<severityRatingLength;i++)if(score>=this.CVSSseveritys[i].bottom&&score<=this.CVSSseveritys[i].top)return this.CVSSseveritys[i];return{name:"?",bottom:"Not",top:"defined"}},roundUp1:function(input){var int_input=Math.round(1e5*input);return int_input%1e4==0?int_input/1e5:(Math.floor(int_input/1e4)+1)/10},calculate:function(cvss){var p,val={},metricWeight={};try{for(p in this.Weight){if(val[p]=cvss[p],void 0===val[p]||""===val[p]||null==val[p])return"?";metricWeight[p]=this.Weight[p][val[p]]}}catch(err){return err}metricWeight.privilegesRequired=this.Weight.privilegesRequired[val.scope][val.privilegesRequired];try{var impactSubScore,impactSubScoreMultiplier=1-(1-metricWeight.confidentialityImpact)*(1-metricWeight.integrityImpact)*(1-metricWeight.availabilityImpact);return impactSubScore="UNCHANGED"===val.scope?metricWeight.scope*impactSubScoreMultiplier:metricWeight.scope*(impactSubScoreMultiplier-.029)-3.25*Math.pow(impactSubScoreMultiplier-.02,15),exploitabality=8.22*metricWeight.attackVector*metricWeight.attackComplexity*metricWeight.privilegesRequired*metricWeight.userInteraction,(impactSubScore<=0?0:"UNCHANGED"===val.scope?this.roundUp1(Math.min(exploitabality+impactSubScore,10)):this.roundUp1(Math.min(1.08*(exploitabality+impactSubScore),10))).toFixed(1)}catch(err){return err}}};