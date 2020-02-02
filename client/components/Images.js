import React from 'react'


let testImages = [
"https://s.hdnux.com/photos/65/50/72/14061202/5/gallery_medium.jpg",
"https://cdn.vox-cdn.com/thumbor/Zlvd88Wrxb18FmiqZYmdmzMoSEM=/0x0:3000x2000/1200x800/filters:focal(0x0:3000x2000)/cdn.vox-cdn.com/uploads/chorus_image/image/49546013/GettyImages-77502576.0.jpg",
"https://www.si.com/.image/t_share/MTY4MTAyNDY4NzU1NzkzMTY5/joe-montana-tall-trophy-inlinejpg.jpg",
"https://cdn-s3.si.com/s3fs-public/brett-favre-sportsman-of-the-year.jpg"
]


const Images = (props) => {
  console.log('PROPS', props)
  //pass the component an array of image urls, replace testImages with props.images
  return (
    <div>
      {testImages.map(el => {
        return <img src={el}></img>
      })}
    </div>
  )
}

export default Images