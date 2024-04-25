import * as i from '@src/components/styles/community/ImageUploadStyle'
import React from 'react'

interface ImageUploadPropsType {
  imageViewValue: string[]
  setImageView: React.Dispatch<React.SetStateAction<string[]>>
}

const ImageUpload = (props: ImageUploadPropsType) => {
  // const { imageFilesValue, setImageFiles } = props
  // const [imageViewValue, setImageView] = useState<string[]>([])
  const { imageViewValue, setImageView } = props

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    let imageUrlLists: string[] = [...imageViewValue]
    if (files) {
      // const fileArray = Array.from(files, f => f as File)
      // setImageFiles(fileArray)
      for (let k = 0; k < files.length; k += 1) {
        const currentImageUrl = URL.createObjectURL(files[k])
        imageUrlLists.push(currentImageUrl)
      }

      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10)
      }

      setImageView(imageUrlLists)
    }
  }

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setImageView(imageViewValue.filter((_, index) => index !== id))
    // setImageFiles(imageFilesValue.filter((_, index) => index !== id))
  }

  return (
    <i.ImgContainer>
      <i.ImgLabel htmlFor="image">
        <i.ImgBox>
          <i.Plus>사진 추가</i.Plus>
          <p className="p">{imageViewValue.length}/10</p>
        </i.ImgBox>
      </i.ImgLabel>
      {imageViewValue.map((imageFile, id) => (
        <i.ImagePreview key={`${imageFile}`}>
          <img
            alt={`${imageFile}-${id}`}
            src={imageFile}
            style={{ height: '100px', width: '100px' }}
          />
          <i.Delete onClick={() => handleDeleteImage(id)}>X</i.Delete>
        </i.ImagePreview>
      ))}
      {/* 이미지 입력 창 */}
      <i.ImageInput
        id="image"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
      />
    </i.ImgContainer>
  )
}
export default ImageUpload
