const dateFormat=(item)=>{
  const date=new Date(item);
  

  const local=date.toLocaleString('en-US',{
    weekday:'short',
    month:'short',
    day:'numeric',
    hour:'numeric',
    minute:'numeric'
  })

  return local;
}

export default dateFormat;