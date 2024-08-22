import { TextField } from '@mui/material'
import Image from 'next/image'
const Searchbar = ({height, width, textColor, bgColor}) => {
  return (
    <main className={`bg-[${bgColor}]`}>
        <TextField
    id="outlined-basic"
    InputProps={{
      startAdornment: (
        <Image src={"/img/searchIcon.png"} height={height} width={width} alt="search" style={{ marginRight: "10px" }}/>
      ),
      className: `text-${textColor} bg-${bgColor} p-[0.3vw] focus:outline-none rounded-md`,
      style: { padding: "0.3vw" },
    }}
    sx={{
      "& input": {
        padding: "0.3vw",
      },
    }}
  />
    </main>
  )
}

export default Searchbar