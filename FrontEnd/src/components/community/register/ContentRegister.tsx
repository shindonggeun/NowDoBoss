import GoBackButton from '@src/common/GoBackButton'
import * as c from '@src/components/styles/community/CommunityRegisterStyle'
import React, { useEffect, useState } from 'react'
import arrow_down from '@src/assets/arrow_down.svg'
import arrow_up from '@src/assets/arrow_up.svg'
import ImageUpload from '@src/components/community/register/ImageUpload'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchCommunityCreate } from '@src/api/communityApi'

const ContentRegister = () => {
  const navigate = useNavigate()
  const [titleValue, setTitle] = useState<string>('')
  const [contentValue, setContent] = useState<string>('')
  const [selectedCategoryValue, setSelectedCategory] = useState<string>('')
  // 보여주기 위한 값
  const [outputCategoryValue, setOutputCategory] =
    useState<string>('카테고리를 선택해주세요.')
  // const [imageFilesValue, setImageFiles] = useState<File[]>([])

  const [imageViewValue, setImageView] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const categories = [
    { name: '이모저모', value: 'ETC' },
    { name: '인테리어', value: 'INTERIOR' },
    { name: '상권공유', value: 'COMMERCIAL_AREA' },
    { name: '동업제안', value: 'PARTNERSHIP' },
    { name: '창업고민', value: 'START_UP' },
  ]
  const [isValid, setIsValid] = useState<boolean>(false)
  useEffect(() => {
    if (titleValue && contentValue && selectedCategoryValue) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [titleValue, contentValue, selectedCategoryValue])

  const { mutate } = useMutation({
    mutationKey: ['communityCreateForm'],
    mutationFn: fetchCommunityCreate,
    onSuccess() {
      navigate(`/community`)
    },
    onError() {
      console.log('에러남')
    },
  })

  const handleSubmit = () => {
    const ArticleData = {
      title: titleValue,
      content: contentValue,
      category: selectedCategoryValue,
      images: imageViewValue,
    }
    mutate(ArticleData)
  }

  return (
    <c.Container>
      <c.Header>
        <GoBackButton />

        {/* 제출 버튼 */}
        <c.SubmitButton
          $isValid={isValid}
          onClick={() => {
            handleSubmit()
          }}
        >
          완료
        </c.SubmitButton>
      </c.Header>
      {/* 내용 입력 */}
      <c.TitleInput
        $isActive={titleValue.length > 0}
        placeholder="제목을 입력해주세요."
        value={titleValue}
        maxLength={19}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTitle(e.target.value)
        }}
      />
      <c.ContentCount>{titleValue.length} / 20</c.ContentCount>

      <c.ContentInput
        $isActive={contentValue.length > 0}
        placeholder="내용을 입력해주세요."
        value={contentValue}
        maxLength={499}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value)
        }}
      />
      <c.ContentCount>{contentValue.length} / 500</c.ContentCount>

      {/* 드롭다운 메뉴 토글 버튼 */}
      <c.Dropdown>
        <c.DropdownTitle>카테고리</c.DropdownTitle>
        <c.DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <c.SelectedContent> {outputCategoryValue}</c.SelectedContent>
          <c.DropdownIcon src={isDropdownOpen ? arrow_up : arrow_down} />
        </c.DropdownButton>

        {/* 드롭다운 메뉴 항목 */}
        {isDropdownOpen && (
          <c.DropdownBox>
            {categories.map(category => (
              <c.DropdownContent
                key={category.name}
                onClick={() => {
                  setOutputCategory(category.name)
                  setSelectedCategory(category.value)
                  setIsDropdownOpen(false)
                }}
              >
                {category.name}
              </c.DropdownContent>
            ))}
          </c.DropdownBox>
        )}
      </c.Dropdown>

      {/* 사진 추가 */}
      <ImageUpload
        imageViewValue={imageViewValue}
        setImageView={setImageView}
      />
    </c.Container>
  )
}
export default ContentRegister
