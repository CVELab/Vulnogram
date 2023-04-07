var infoMsg=document.getElementById("infoMsg"),errMsg=document.getElementById("errMsg"),save1=document.getElementById("save1"),save2=document.getElementById("save2"),editorLabel=document.getElementById("editorLabel"),iconTheme="vgi-",starting_value={},sourceEditor;JSONEditor.defaults.languages.en.error_oneOf="Please fill in the required fields *",JSONEditor.AbstractEditor.prototype.showStar=function(){return this.isRequired()&&!(this.schema.readOnly||this.schema.readonly||this.schema.template)},JSONEditor.defaults.resolvers.unshift(function(schema){if("string"===schema.type&&"radio"===schema.format)return"radio"}),JSONEditor.defaults.templates.custom=function(){return{compile:function(template){return function(context){var ret=eval(template);return ret}}}},JSONEditor.defaults.editors.array=class extends JSONEditor.defaults.editors.array{build(){super.build(),this.header&&(this.options.class&&(this.header.className="lbl "+this.options.class),this.showStar()&&(this.header.className=this.header.className+" req"))}_createDeleteButton(i,holder){var r=super._createDeleteButton(i,holder);return r.setAttribute("class","sbn vgi-cancel"),r.innerHTML="",r.parentNode.setAttribute("vg","obj-del"),this.options.disable_array_add||r.parentNode.parentNode.setAttribute("vg","array-obj"),r}},JSONEditor.defaults.editors.table=class extends JSONEditor.defaults.editors.table{build(){super.build(),this.header&&(this.options.class&&(this.header.className="lbl "+this.options.class),this.showStar()&&(this.header.className=this.header.className+" req"))}},JSONEditor.defaults.editors.object=class extends JSONEditor.defaults.editors.object{build(){super.build(),this.title&&(this.options.class&&(this.title.className=this.title.className+" "+this.options.class),this.showStar()&&(this.title.className=this.title.className+" req"))}getValue(){if(!this.dependenciesFulfilled)return;const result=this.value;return result&&(this.jsoneditor.options.remove_empty_properties||this.options.remove_empty_properties)&&Object.keys(result).forEach(key=>{var req=Array.isArray(this.schema.required)&&this.schema.required.includes(key);(obj=>void 0===obj||""===obj||obj===Object(obj)&&0===Object.keys(obj).length&&obj.constructor===Object||Array.isArray(obj)&&0===obj.length)(result[key])&&!req&&delete result[key]}),result}},JSONEditor.defaults.editors.number=class extends JSONEditor.defaults.editors.number{build(){if(super.build(),this.label&&this.options.class&&(this.label.className=this.label.className+" "+this.options.class,this.showStar()&&(this.label.className=this.label.className+" req")),this.options.formClass&&(this.control.className=this.control.className+" "+this.options.formClass),this.schema.examples&&this.schema.examples.length>0){var dlist=document.createElement("datalist");dlist.setAttribute("id",this.path+"-datalist");for(var eg=this.schema.examples,i=0;i<eg.length;i++){var v=document.createElement("option");v.setAttribute("value",eg[i]),dlist.appendChild(v)}this.input.setAttribute("list",this.path+"-datalist"),this.input.type="search",this.container.appendChild(dlist)}}},JSONEditor.defaults.editors.string=class extends JSONEditor.defaults.editors.string{addLink(link){this.header&&this.header.appendChild(link)}getLink(data){var style=null;data.class&&(style=data.class,delete data.class);var h=super.getLink(data);return style&&h.setAttribute("class",style),data.target&&h.setAttribute("target",data.target),h}build(){if(super.build(),this.label&&this.options.class&&(this.label.className=this.label.className+" "+this.options.class,this.showStar()&&(this.label.className=this.label.className+" req")),this.options.formClass&&(this.control.className=this.control.className+" "+this.options.formClass),this.schema.examples&&this.schema.examples.length>0){var dlist=document.createElement("datalist");dlist.setAttribute("id",this.path+"-datalist");for(var eg=this.schema.examples,i=0;i<eg.length;i++){var v=document.createElement("option");v.setAttribute("value",eg[i]),dlist.appendChild(v)}this.input.setAttribute("list",this.path+"-datalist"),this.input.type="search",this.container.appendChild(dlist)}}};var uid=1;function tzOffset(x){var offset=new Date(x).getTimezoneOffset(),o=Math.abs(offset);return(offset<0?"+":"-")+("00"+Math.floor(o/60)).slice(-2)+":"+("00"+o%60).slice(-2)}JSONEditor.defaults.editors.radio=class extends JSONEditor.AbstractEditor{setValue(value,initial){var sanitized=value=this.typecast(value||"");if(this.schema.enum.indexOf(sanitized)<0&&(sanitized=this.schema.enum[0]),this.value!==sanitized){for(var input in this.inputs)if(input===sanitized)return this.inputs[input].checked=!0,this.value=sanitized,this.jsoneditor.notifyWatchers(this.path),!1}}register(){if(super.register(),this.inputs)for(var i=0;i<this.inputs.length;i++)this.inputs[i].setAttribute("name",this.formname)}unregister(){if(super.unregister(),this.inputs)for(var i=0;i<this.inputs.length;i++)this.inputs[i].removeAttribute("name")}getNumColumns(){for(var longest_text=this.getTitle().length,i=0;i<this.schema.enum.length;i++)longest_text=Math.max(longest_text,this.schema.enum[i].length+4);return Math.min(12,Math.max(longest_text/7,2))}typecast(value){return"boolean"===this.schema.type?!!value:"number"===this.schema.type?1*value:"integer"===this.schema.type?Math.floor(1*value):""+value}getValue(){return this.value}removeProperty(){super.removeProperty();for(var i=0;i<this.inputs.length;i++)this.inputs[i].style.display="none";this.description&&(this.description.style.display="none"),this.theme.disableLabel(this.label)}addProperty(){super.addProperty();for(var i=0;i<this.inputs.length;i++)this.inputs[i].style.display="";this.description&&(this.description.style.display=""),this.theme.enableLabel(this.label)}sanitize(value){return"number"===this.schema.type?1*value:"integer"===this.schema.type?Math.floor(1*value):""+value}build(){var i,self=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.label&&this.options.class&&(this.label.className=this.label.className+" "+this.options.class,this.showStar()&&(this.label.className=this.label.className+" req")),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.select_options={},this.select_values={};var e=this.schema.enum||[],options=[];for(i=0;i<e.length;i++)this.sanitize(e[i])===e[i]&&(options.push(e[i]+""),this.select_values[e[i]+""]=e[i]);for(this.input_type="radiogroup",this.inputs={},this.controls={},i=0;i<options.length;i++){this.inputs[options[i]]=this.theme.getRadio(),this.inputs[options[i]].setAttribute("value",options[i]),this.inputs[options[i]].setAttribute("name",this.formname);var xid=uid++;this.inputs[options[i]].setAttribute("id",xid);var label=this.theme.getRadioLabel(this.schema.options&&this.schema.options.enum_titles&&this.schema.options.enum_titles[i]?this.schema.options.enum_titles[i]:options[i]);label.setAttribute("for",xid);var rdicon=null;this.options.icons&&this.options.icons[options[i]]?rdicon=this.options.icons[options[i]]:iconMap[options[i]]&&(rdicon=iconMap[options[i]]),label.setAttribute("class","lbl"+(rdicon?" "+iconTheme+rdicon:"")),this.controls[options[i]]=this.theme.getFormControl(this.inputs[options[i]],label)}this.control=this.theme.getRadioGroupHolder(this.controls,this.label,this.description),this.container.appendChild(this.control),this.control.addEventListener("change",function(e){e.preventDefault(),e.stopPropagation();var val=e.target.value,sanitized=val;-1===self.schema.enum.indexOf(val)&&(sanitized=self.schema.enum[0]),self.value=sanitized,self.parent?self.parent.onChildEditorChange(self):self.jsoneditor.onChange(),self.jsoneditor.notifyWatchers(self.path)})}enable(){if(!this.always_disabled)for(var opts=Object.keys(this.inputs),i=0;i<opts.length;i++)this.inputs[opts[i]].disabled=!1;super.enable()}disable(){for(var opts=Object.keys(this.inputs),i=0;i<opts.length;i++)this.inputs[opts[i]].disabled=!0;super.disable()}destroy(){this.label&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode.removeChild(this.description);for(var i=0;i<this.inputs.length;i++)this.inputs[i].parentNode.removeChild(this.inputs[i]);super.destroy()}};const localTZ=(new Date).toLocaleString("en",{timeZoneName:"short"}).split(" ").pop();JSONEditor.defaults.editors.dateTime=class extends JSONEditor.defaults.editors.string{getValue(){if(this.value&&this.value.length>0){this.value.match(/^\d{4}-\d{2}-\d{2}T[\d\:\.]+$/)&&(this.value=this.value+tzOffset(this.value));var d=new Date(this.value);return d instanceof Date&&!isNaN(d.getTime())?d.toISOString():this.value}return""}setValue(val){val&&this.value.match(/^\d{4}-\d{2}-\d{2}T[\d\:\.]+$/)&&(val+=tzOffset());var d=new Date(val);if(d instanceof Date&&!isNaN(d.getTime())&&d.getTime()>0){var x=new Date(d.getTime()-6e4*d.getTimezoneOffset());this.value=this.input.value=x.toJSON().slice(0,16)}else this.value=this.input.value="";this.jsoneditor.notifyWatchers(this.path)}build(){this.schema.format="datetime-local",super.build(),this.input.className="txt",this.input.setAttribute("tz",localTZ)}},JSONEditor.defaults.editors.taglist=class extends JSONEditor.defaults.editors.string{getValue(){return this.tagify&&this.tagify.value?this.tagify.value.map(item=>item.value):[]}setValue(val){val instanceof Array?(this.tagify.removeAllTags(),this.tagify.addTags(val)):this.tagify.addTags(val.split(",")),this.onChange(!0)}build(){this.schema.format="taglist",super.build(),this.tagify=new Tagify(this.input,{whitelist:this.schema.items.enum?this.schema.items.enum:this.schema.items.examples?this.schema.items.examples:[],enforceWhitelist:!!this.schema.items.enum,maxTags:this.schema.maxItems?this.schema.maxItems:512,dropdown:{maxItems:40,classname:"tags-look",enabled:0,closeOnSelect:!1}}),this.options&&this.options.inputAttributes&&this.options.inputAttributes.placeholder&&this.input.setAttribute("placeholder",this.options.inputAttributes.placeholder)}},JSONEditor.defaults.editors.simplehtml=class extends JSONEditor.defaults.editors.string{getValue(){var ret=super.getValue();return this.wysLoaded&&(ret=this.wys.getValue()),ret}setValue(value,initial,from_template){if(super.setValue(value,initial,from_template),this.wysLoaded){var priorVal=this.wys.getValue();this.wys.setValue(value);var currentVal=this.wys.getValue();priorVal!=currentVal&&(this.input.value=currentVal,this.onChange(!0))}}build(){this.schema.format=this.format="hidden",super.build(),this.label&&this.options.class&&(this.label.className=this.label.className+" "+this.options.class,this.showStar()&&(this.label.className=this.label.className+" req")),this.control.className="simplehtml form-control bor",this.toolbar=document.createElement("div"),this.toolbar.innerHTML='<div class="toolbar"><div><span class="btg indent"><a class="sbn vgi-bold" data-wysihtml5-command="bold" title="Bold CTRL+B" href="javascript:;" unselectable="on"></a><a class="sbn vgi-italic" data-wysihtml5-command="italic" title="Italic CTRL+I" href="javascript:;" unselectable="on"></a><a class="sbn vgi-underline" data-wysihtml5-command="underline" title="Underline CTRL+U" href="javascript:;" unselectable="on"></a><a class="sbn vgi-highlight" data-wysihtml5-command="bgColorStyle" title="highlight" color="#666699" data-wysihtml5-command-value="#effa66" href="javascript:;" unselectable="on"></a>\x3c!-- <a class="fbn icn strikethrough" data-wysihtml5-command="strike" title="Strike"></a>--\x3e</span><span class="btg indent"><a class="sbn vgi-p" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p" title="paragraph style" href="javascript:;" unselectable="on"></a><a class="sbn vgi-h1" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1" title="Heading 1" href="javascript:;" unselectable="on"></a><a class="sbn vgi-h2" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2" title="Heading 2" href="javascript:;" unselectable="on"></a><a class="sbn vgi-h3" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3" title="Heading 3" href="javascript:;" unselectable="on"></a><a class="sbn vgi-noformat" data-wysihtml5-command="formatBlock" data-wysihtml5-command-blank-value="true" unselectable="on" title="Clear styles" href="javascript:;"></a></span><span class="btg indent"><a class="sbn vgi-link" data-wysihtml5-command="createLink" title="Hyperlink" href="javascript:;" unselectable="on"></a><a class="sbn vgi-unlink" data-wysihtml5-command="removeLink" title="Unlink" href="javascript:;" unselectable="on"></a><a class="sbn vgi-pic" data-wysihtml5-command="insertImage" title="Insert image" href="javascript:;" unselectable="on"></a><a class="sbn vgi-console" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="tt" title="Code text" href="javascript:;" unselectable="on"></a><a class="sbn vgi-quote" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="blockquote" title="Block quote" href="javascript:;" unselectable="on"></a><a class="sbn vgi-table" data-wysihtml5-command="createTable" title="Insert Table" href="javascript:;" unselectable="on"></a></span><span class="btg indent"><a class="sbn vgi-bullet" data-wysihtml5-command="insertUnorderedList" title="Bulletted list" href="javascript:;" unselectable="on"></a><a class="sbn vgi-numbered" data-wysihtml5-command="insertOrderedList" title="Numbered list" href="javascript:;" unselectable="on"></a></span><span class="btg indent"><a class="sbn vgi-undo" data-wysihtml5-command="undo" title="Undo" href="javascript:;" unselectable="on"></a><a class="sbn vgi-redo" data-wysihtml5-command="redo" title="Redo" href="javascript:;" unselectable="on"></a><a class="sbn vgi-markup" data-wysihtml5-action="change_view" title="HTML source view" href="javascript:;" unselectable="on"></a></span><span class="btg indent" data-wysihtml5-hiddentools="table" style="display: none;"><a class="sbn vgi-add-row-top" data-wysihtml5-command="addTableCells" data-wysihtml5-command-value="above" title="Insert row above" href="javascript:;" unselectable="on"></a><a class="sbn vgi-add-row-down" data-wysihtml5-command="addTableCells" data-wysihtml5-command-value="below" title="Insert row below" href="javascript:;" unselectable="on"></a><a class="sbn vgi-add-col-left" data-wysihtml5-command="addTableCells" data-wysihtml5-command-value="before" title="Insert column before" href="javascript:;" unselectable="on"></a><a class="sbn vgi-add-col-right" data-wysihtml5-command="addTableCells" data-wysihtml5-command-value="after" title="Insert column after" href="javascript:;" unselectable="on"></a><a class="sbn vgi-row-red" data-wysihtml5-command="deleteTableCells" data-wysihtml5-command-value="row" title="Delete row" href="javascript:;" unselectable="on"></a><a class="sbn vgi-col-red" data-wysihtml5-command="deleteTableCells" data-wysihtml5-command-value="column" title="Delete column" href="javascript:;" unselectable="on"></a></span></div><div data-wysihtml5-dialog="createLink" style="display: none;"><label class="lbl sml vgi-link">Link: </label><input class="vgi-text" size="90" data-wysihtml5-dialog-field="href" value="https://" title="URL"><a class="btn vgi-ext" onclick="window.open(this.previousElementSibling.value)">Open</a><a class="btn indent vgi-ok" data-wysihtml5-dialog-action="save">OK</a><a class="btn vgi-cancel" data-wysihtml5-dialog-action="cancel">Cancel</a></div><div data-wysihtml5-dialog="insertImage" style="display: none;"><label class="lbl vgi-link">URL</label><input class="vgi-txt" data-wysihtml5-dialog-field="src" size="50" value="https://"><label class="lbl">or</label><label class="btn vgi-folder" title="Browse for local images to insert">Insert Image ..<input class="hid" type="file" onchange="loadimg.call(this, event)" accept="image/*"></label><a class="btn indent vgi-ok" data-wysihtml5-dialog-action="save">OK</a><a class="btn vgi-cancel" data-wysihtml5-dialog-action="cancel">Cancel</a></div><div data-wysihtml5-dialog="createTable" style="display: none;"><label class="vgi-table lbl">Rows: </label><input class="txt" type="text" data-wysihtml5-dialog-field="rows"><label class="lbl">Cols: </label><input class="txt" type="text" data-wysihtml5-dialog-field="cols"><a class="btn vgi-ok indent" data-wysihtml5-dialog-action="save">OK</a><a class="btn vgi-cancel" data-wysihtml5-dialog-action="cancel">Cancel</a></div></div>',this.contentDiv=document.createElement("div"),this.contentDiv.className="pur ht4 fil",this.toolbar&&(this.toolbar.className="fil shd wht stk toolbar",this.input.parentNode.insertBefore(this.toolbar,this.input)),this.input.parentNode.appendChild(this.contentDiv)}afterInputReady(){var self=this;this.wys=new wysihtml5.Editor(this.contentDiv,{toolbar:this.toolbar,parserRules:wysihtml5ParserRules,showToolbarAfterInit:!1});this.wys.on("load",function(){self.wys.setValue(self.input.value);var sa=self.wys.getValue();sa!=self.input.value&&(self.input.value=sa),self.wysLoaded=!0}),this.wys.on("change",function(){self.value=self.input.value=self.wys.getValue(),self.is_dirty=!0,self.onChange(!0)}),this.wys.on("dragleave",function(event){event.preventDefault(),event.stopPropagation()}),this.wys.on("drop",function(event){event.preventDefault(),event.stopPropagation();var files=event.dataTransfer.files,reader=new FileReader;reader.onload=function(e){self.wys.composer.commands.exec("insertImage",e.target.result),self.value=self.input.value=self.wys.getValue(),self.is_dirty=!0,self.onChange(!0)},reader.readAsDataURL(files[0])}),this.wys.on("dragover",function(event){event.preventDefault(),event.stopPropagation(),this.addClass("dragging")})}showValidationErrors(errs){var self=this;if("always"===this.jsoneditor.options.show_errors);else if(!this.is_dirty&&this.previous_error_setting===this.jsoneditor.options.show_errors)return;this.previous_error_setting=this.jsoneditor.options.show_errors;var messages=[];errs.forEach(i=>{i.path===self.path&&messages.push(i.message)}),messages.length?this.theme.addInputError(this.control,messages.join(". ")+"."):this.theme.removeInputError(this.control)}},JSONEditor.defaults.resolvers.unshift(function(schema){if("string"===schema.type&&"datetime"===schema.format)return"dateTime"}),JSONEditor.defaults.resolvers.unshift(function(schema){if("array"===schema.type&&"taglist"===schema.format)return"taglist"}),JSONEditor.defaults.resolvers.unshift(function(schema){if("string"===schema.type&&"simplehtml"===schema.format)return"simplehtml"});var iconMapping={collapse:"down",expand:"add",delete:"cancel",edit:"edit",add:"add",cancel:"cancel",save:"save",moveup:"up",movedown:"down"};JSONEditor.defaults.iconlibs.vgi=class extends JSONEditor.AbstractIconLib{constructor(){super(),this.mapping=iconMapping,this.icon_prefix="vgi-"}},JSONEditor.defaults.options.iconlib="vgi",JSONEditor.defaults.themes.customTheme=class extends JSONEditor.AbstractTheme{getBlockLink(){return document.createElement("a")}getLinksHolder(){return document.createElement("span")}getDescription(text){return document.createElement("summary")}getFormControl(label,input,description,infoText){var el=super.getFormControl(label,input,description,infoText);return"text"==input.type&&(input.className="txt"),el}getFormInputLabel(text){var el=super.getFormInputLabel(text);return el.className="lbl"+(iconMap[text]?" "+iconTheme+iconMap[text]:""),el}getHeader(text){var el=document.createElement("span");return"string"==typeof text?(el.textContent=text,iconMap[text]&&(el.className=iconTheme+iconMap[text])):(iconMap[text.textContent]&&(text.className=iconTheme+iconMap[text.textContent]),el.appendChild(text)),el}getTable(){var el=super.getTable();return el.className="tbl",el}getTableHeaderCell(text){const el=document.createElement("b");this.options&&this.options.class?el.className=this.options.class:iconMap[text]&&(el.className=iconTheme+iconMap[text]),el.textContent=" "==text?"":text;const t=document.createElement("th");return t.appendChild(el),t}getButton(text,icon,title){var el=document.createElement("button");return el.type="button",el.className="btn",this.setButtonText(el,text,icon,title),el}addInputError(input,text){try{input.setCustomValidity(text),input.onfocus=function(){this.reportValidity()},input.oninput=function(){this.setAttribute("novalidate",!0),this.setCustomValidity("")}}catch(e){}if(input.style.boxShadow="0px 0px 0px 2px rgba(252, 114, 114, 0.33)",input.style.border="1px solid coral",text&&"Value required."!=text){if(input.errmsg)input.errmsg.style.display="block";else{var group=this.closest(input,".form-control");input.errmsg=document.createElement("div"),input.errmsg.setAttribute("class","lbl tred indent"),input.errmsg.style=input.errmsg.style||{},group.appendChild(input.errmsg)}input.errmsg.textContent="",input.errmsg.appendChild(document.createTextNode(" "+text))}}removeInputError(input){try{input.setCustomValidity("")}catch(e){}input.style.border="",input.style.boxShadow="",input.errmsg&&(input.errmsg.style.display="none")}getRadio(){return this.getFormInputField("radio")}getRadioGroupHolder(controls,label,description){var el=document.createElement("div"),radioGroup=document.createElement("div");for(var i in radioGroup.className="rdg",label&&el.appendChild(label),el.appendChild(radioGroup),controls)controls.hasOwnProperty(i)&&radioGroup.appendChild(controls[i]);return description&&el.appendChild(description),el}getRadioLabel(text){return this.getFormInputLabel(text)}getProgressBar(){var progressBar=document.createElement("progress");return progressBar.setAttribute("max",100),progressBar.setAttribute("value",0),progressBar}updateProgressBar(progressBar,progress){progressBar&&progressBar.setAttribute("value",progress)}updateProgressBarUnknown(progressBar){progressBar&&progressBar.removeAttribute("value")}setGridColumnSize(el,size){el.className="col s"+size}getSwitcher(options){const switcher=this.getSelectInput(options,!1);return switcher.classList.add("je-switcher"),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(switcher.classList.add("rdg"),switcher.setAttribute("size",2)),switcher}},JSONEditor.defaults.themes.customTheme.rules={},"undefined"!=typeof custom_validators&&(JSONEditor.defaults.custom_validators=custom_validators);var docEditorOptions={ajax:allowAjax,theme:"customTheme",show_errors:"always",disable_collapse:!0,disable_array_reorder:!0,disable_properties:!0,disable_edit_json:!0,disable_array_delete_last_row:!0,disable_array_delete_all_rows:!0,input_width:"3em",input_height:"4em",template:"custom",prompt_before_delete:!1,ajaxBase:ajaxBase,schema:docSchema,remove_empty_properties:!0},docEditor,selected="editorTab";if("undefined"!=typeof defaultTab)selected=defaultTab;else if(window.location.hash){var hash=window.location.hash.substring(1);hash&&document.getElementById(hash+"Tab")&&(selected=hash+"Tab")}var insync=!1;function Tabs(tabGroupId,tabOpts,primary){for(var elem=document.getElementById(tabGroupId),tg={changeIndex:[],primary:primary,tabOpts:tabOpts,tabId:[],element:elem,tabs:elem.getElementsByClassName("tab")},i=0;i<tg.tabs.length;i++){var tab=tg.tabs[i];tab.nextElementSibling._tgIndex=tab._tgIndex=i,tab.id&&(tg.tabId[i]=tab.id),tg.changeIndex[i]=0,tab.addEventListener("change",function(event){tg.select(event,event.target)})}return tg.changeIndex[0]=1,tg.select=function(event,elem){errMsg.textContent="";var selected=elem._tgIndex;if(tg.changeIndex[selected]<Math.max(...tg.changeIndex)){var val=tg.getValue();if(!val)return void event.preventDefault();selected!=primary&&(tg.setValue(selected,val),tg.changeIndex[selected]=tg.changeIndex[primary])}window.location.hash=tg.tabId[selected].replace(/Tab$/,"")},tg.getValue=function(i){if(void 0==i){for(var maxi=0,m=0;m<tg.tabs.length;m++)tg.changeIndex[m]>tg.changeIndex[maxi]&&(maxi=m);var src=tg.tabId[maxi];if(src&&tg.tabOpts[src].validate)if(-1==tg.tabOpts[src].validate())return;var val=tg.getValue(maxi),primaryChanged=!1;if(maxi!=primary){tg.setValue(primary,val),primaryChanged=!0,tg.changeIndex[primary]=tg.changeIndex[maxi];var primaryOpts=tg.tabOpts[tg.tabId[primary]];primaryOpts&&primaryOpts.validate&&primaryOpts.validate()}if(!primaryChanged)return val;i=primary}return tg.tabOpts[tg.tabId[i]]&&tg.tabOpts[tg.tabId[i]].getValue?tg.tabOpts[tg.tabId[i]].getValue():void 0},tg.setValue=function(index,val){if(tg.tabOpts[tg.tabId[index]]&&tg.tabOpts[tg.tabId[index]].setValue)return tg.tabOpts[tg.tabId[index]].setValue(val)},tg.focus=function(index){insync||(tg.tabs[index]?(tg.tabs[index].checked=!0,tg.tabs[index].dispatchEvent(new Event("change"))):console.log("no tab"))},tg.change=function(index){if(!insync){tg.changeIndex[index]++,errMsg.textContent="",editorLabel.className="lbl",infoMsg.textContent="Edited";var nid=getDocID();document.title="• "+(nid||"Vulnogram"),document.getElementById("save1")&&(save2.className="btn sfe gap save",save1.className="fbn sfe save")}},tg}var originalTitle=document.title,changes=!0;function showJSONerrors(errors){var totalMessage="";for(e of errors)totalMessage+=e.path+": <i>"+e.message+".</i></br>";errCount.className="indent bdg",errPop.className="popup",errCount.innerText=errors.length,errList.innerHTML=totalMessage,editorLabel.className="red lbl"}function hideJSONerrors(){errCount.innerText="",errPop.className="hid",errList.textContent="",editorLabel.className="lbl"}document.getElementById("remove")&&document.getElementById("remove").addEventListener("click",function(){confirm("Delete this "+originalTitle+"?")&&fetch("",{method:"DELETE",credentials:"include",headers:{Accept:"application/json, text/plain, */*","CSRF-Token":csrfToken}}).then(function(response){200==response.status?(infoMsg.textContent="Deleted ",errMsg.textContent="",window.location="./"):(errMsg.textContent="Error "+response.statusText,infoMsg.textContent="")})}),document.getElementById("save1")&&document.getElementById("save2")&&(document.getElementById("save1").addEventListener("click",save),document.getElementById("save2").addEventListener("click",save),document.getElementById("save2").removeAttribute("style"));var defaultTabs={editorTab:{setValue:function(val){insync=!0,docEditor.setValue(val),insync=!1},getValue:function(){return docEditor.getValue()},validate:function(x){var errors=[];return errors=x?docEditor.validate(x):docEditor.validate(),"undefined"!=typeof errorFilter&&(errors=errorFilter(errors)),errors.length>0?(docEditor.setOption("show_errors","always"),showJSONerrors(errors),0):(hideJSONerrors(),1)}},sourceTab:{setValue:function(val){void 0==sourceEditor&&((sourceEditor=ace.edit("output")).getSession().setMode("ace/mode/json"),sourceEditor.getSession().on("change",function(){mainTabGroup.change(1)}),sourceEditor.setOptions({maxLines:480,wrap:!0}),sourceEditor.$blockScrolling=1/0),insync=!0,sourceEditor.getSession().setValue(JSON.stringify(val,null,2)),sourceEditor.clearSelection(),insync=!1},validate:function(){try{var hasError=!1,firsterror=null,annotations=sourceEditor.getSession().getAnnotations();for(var l in annotations){var annotation=annotations[l];if("error"===annotation.type){hasError=!0,firsterror=annotation;break}}return hasError?(sourceEditor.moveCursorTo(firsterror.row,firsterror.column,!1),sourceEditor.clearSelection(),errMsg.textContent="Please fix error: "+firsterror.text,document.getElementById("sourceTab").checked=!0,-1):1}catch(err){return errMsg.textContent=err.message,document.getElementById("sourceTab").checked=!0,-1}},getValue:function(){return JSON.parse(sourceEditor.getSession().getValue())}}};"undefined"!=typeof additionalTabs&&Object.assign(defaultTabs,additionalTabs);var mainTabGroup=new Tabs("mainTabGroup",defaultTabs,0);function loadJSON(res,id,message){docEditor&&docEditor.destroy(),(docEditor=new JSONEditor(document.getElementById("docEditor"),docEditorOptions)).on("ready",async function(){if(await docEditor.root.setValue(res,!0),infoMsg.textContent=message||"",errMsg.textContent="",id)document.title=id;else{var nid=getDocID();document.title=nid||"Vulnogram"}document.getElementById("save1")&&(save2.className="btn sfe gap",save1.className="fbn sfe"),message&&(selected="editorTab"),docEditor.watch("root",function(){mainTabGroup.change(0)}),docEditor.on("change",async function(){var errors=[];docEditor.validation_results&&docEditor.validation_results.length>0&&(errors="undefined"!=typeof errorFilter?errorFilter(docEditor.validation_results):docEditor.validation_results),errors.length>0?showJSONerrors(errors):hideJSONerrors()}),editorLabel.className="lbl",postUrl=getDocID()?"./"+getDocID():"./new",document.getElementById(selected).checked=!0;var event=new Event("change");setTimeout(function(){document.getElementById(selected).dispatchEvent(event)},50)})}function save(){var j=mainTabGroup.getValue();j&&(infoMsg.textContent="Saving...",fetch(postUrl||"",{method:"POST",credentials:"include",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json","CSRF-Token":csrfToken},redirect:"error",body:JSON.stringify(j)}).then(function(response){if(!response.ok)throw Error(response.statusText);return response.json()}).then(function(res){"go"==res.type?window.location.href=res.to:"err"==res.type?(errMsg.textContent=res.msg,infoMsg.textContent=""):"saved"==res.type&&(infoMsg.textContent="Saved",errMsg.textContent="",document.title=originalTitle,document.getElementById("save1")&&(save2.className="btn sfe gap",save1.className="fbn sfe"),getChanges(getDocID())),changes=0}).catch(function(error){errMsg.textContent=error+" Try reloading the page."}),document.getElementById("docEditor").submit())}function getDocID(){var idEditor=docEditor.getEditor("root."+idpath);if(idEditor){var val=idEditor.getValue();return val||null}}function copyText(element){if(document.selection){var range=document.body.createTextRange();range.moveToElementText(element),range.select(),document.execCommand("copy"),document.selection.empty(),infoMsg.textContent="Copied JSON to clipboard"}else if(window.getSelection){var mrange=document.createRange();mrange.selectNode(element),window.getSelection().removeAllRanges(),window.getSelection().addRange(mrange),document.execCommand("copy"),window.getSelection().removeAllRanges(),infoMsg.textContent="Copied JSON to clipboard"}}function importFile(event,elem){document.getElementById("importJSON").click()}function loadFile(event,elem){var file=elem.files[0];if(file){var reader=new FileReader;reader.readAsText(file,"UTF-8"),reader.onload=function(evt){loadJSON(JSON.parse(evt.target.result),null,"Imported file")},reader.onerror=function(evt){errMsg.textContent="Error reading file"}}}function downloadFile(event,link){var j=mainTabGroup.getValue();if(!j)return event.preventDefault(),alert("JSON Validation Failure: Fix the errors before downloading"),!1;var file=new File([textUtil.getMITREJSON(textUtil.reduceJSON(j))],getDocID()+".json",{type:"text/plain",lastModified:new Date});link.href=URL.createObjectURL(file),link.download=file.name,document.getElementById("docEditor").submit()}function downloadText(element,link){if(!mainTabGroup.getValue())return event.preventDefault(),alert("JSON Validation Failure: Fix the errors before downloading."),!1;var file=new File([element.textContent],getDocID()+".json",{type:"text/plain",lastModified:new Date});link.href=URL.createObjectURL(file),link.download=file.name}function downloadHtml(title,element,link){var file=new File(["<html><head><title>"+title+"</title><body>"+element.innerHTML+"</body></html>"],getDocID()+".html",{type:"text/html",lastModified:new Date});link.href=URL.createObjectURL(file),link.download=file.name}