export function getFileAccessHttpUrl(avatar:string,subStr:string): any {
    if(!subStr) subStr = 'http'
    try {
      if(avatar && avatar.startsWith(subStr)){
        return avatar;
      }else{
        if(avatar &&　avatar.length>0 && avatar.indexOf('[')==-1){
          return CONFIG['staticDomainURL'] + "/" + avatar;
        }
      }
    }catch(err){
     return ;
    }
  }