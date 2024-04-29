import { useEffect, useRef, useState } from 'react'
import down_arrow from '@src/assets/arrow_down.svg'
import location_icon from '@src/assets/location_icon.svg'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Place = styled.div`
  //border-bottom: 2px solid #d9d9d9;
  margin: 10px 10px;
  padding: 20px;
  text-align: right;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  justify-content: right;
`
const TitleIcon = styled.img``

const Content = styled.div`
  font-weight: 500;
`
const ChoiceContent = styled.div`
  font-weight: 500;
  width: 40%;
  text-align: center;
  padding-top: 5px;
  @media only screen and (max-width: 680px) {
    width: 38%;
  }
`
const SelectPlace = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  position: relative;
`

const Dropdown = styled.div`
  border-bottom: 1px solid black;
  width: 30%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin: 5px 0 0 20px;
`
const SelectedContent = styled.div`
  text-align: right;
  font-weight: 500;
  width: 60%;
`
const SelectedDistrict = styled.div`
  text-align: center;
  font-weight: 500;
  width: 60%;
  margin-left: 20%;
`
const ArrowIcon = styled.img``
const DropdownBox = styled.div<{ $place: string }>`
  position: absolute;
  right: ${({ $place }) => {
    const placeToRight: { [key: string]: string } = {
      goo: '65%',
      dong: '36.7%',
      district: '6.5%',
    }
    return placeToRight[$place] || placeToRight.default
  }};
  width: 24%;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;

  @media only screen and (max-width: 680px) {
    right: ${({ $place }) => {
      const placeToRight: { [key: string]: string } = {
        goo: '65%',
        dong: '35%',
        district: '5%',
      }
      return placeToRight[$place] || placeToRight.default
    }};
    width: 26%;
    height: 15vh;
    overflow-y: scroll;
  }
  @media only screen and (max-width: 500px) {
    right: ${({ $place }) => {
      const placeToRight: { [key: string]: string } = {
        goo: '64%',
        dong: '36%',
        district: '7%',
      }
      return placeToRight[$place] || placeToRight.default
    }};
    width: 23%;
  }
`
const DropdownContent = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #5f5f5f;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 3px;
  }
`

const ChoicePlace = () => {
  const location = useLocation()

  // 드롭다운 열렸는지 여부
  const [dropdownGooOpen, setDropdownGooOpen] = useState<boolean>(false)
  const [dropdownDongOpen, setDropdownDongOpen] = useState<boolean>(false)
  const [dropdownDistrictOpen, setDropdownDistrictOpen] =
    useState<boolean>(false)

  // 선택된 드롭다운
  const [selectedGoo, setSelectedGoo] = useState<string>('행정구')
  const [selectedDong, setSelectedDong] = useState<string>('행정동')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('상권')

  // 드롭다운 열었을 때 다른 곳 눌러도 드롭다운 닫히게 하는 ref
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // 임시 더미데이터
  const goos = [
    {
      name: '강동구',
    },
    {
      name: '송파구',
    },
    {
      name: '강남구',
    },
    {
      name: '성북구',
    },
    {
      name: '강서구',
    },
    {
      name: '노원구',
    },
    {
      name: '은평구',
    },
  ]
  const dongs = [
    {
      name: '장덕동',
    },
    {
      name: '하남동',
    },
    {
      name: '남천동',
    },
    {
      name: '둔촌동',
    },
    {
      name: '명일동',
    },
    {
      name: '이런동',
    },
    {
      name: '저런동',
    },
  ]
  const districts = [
    {
      name: '어디앞',
    },
    {
      name: '저기앞',
    },
    {
      name: '어디골목',
    },
    {
      name: '저기골목',
    },
    {
      name: '여기',
    },
    {
      name: '저기',
    },
    {
      name: '조기',
    },
  ]

  // 드롭다운 열었을 때 외부 클릭 시 드롭다운 닫히게 하는 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownGooOpen(false)
        setDropdownDongOpen(false)
        setDropdownDistrictOpen(false)
      }
    }

    // 드롭다운이 열려있을 때만 이벤트 리스너 추가
    if (dropdownGooOpen || dropdownDongOpen || dropdownDistrictOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // 컴포넌트 언마운트 혹은 드롭다운이 닫힐 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownGooOpen, dropdownDongOpen, dropdownDistrictOpen]) // 드롭다운 상태 변경 시 useEffect 재실행

  return (
    <Place>
      <Title>
        <TitleIcon src={location_icon} />
        위치선택
      </Title>
      <Content>분석하고 싶은 상권을 선택해주세요.</Content>

      <SelectPlace ref={dropdownRef}>
        {/* 행정구 드롭다운 */}
        <Dropdown
          onClick={() => {
            setDropdownGooOpen(!dropdownGooOpen)
          }}
        >
          <SelectedContent>{selectedGoo}</SelectedContent>{' '}
          <ArrowIcon src={down_arrow} />
        </Dropdown>

        {/* 행정동 드롭다운 */}
        <Dropdown
          onClick={() => {
            setDropdownDongOpen(!dropdownDongOpen)
          }}
        >
          <SelectedContent>{selectedDong}</SelectedContent>{' '}
          <ArrowIcon src={down_arrow} />
        </Dropdown>

        {location.pathname === '/recommend' ? (
          <ChoiceContent>가 선택되었습니다.</ChoiceContent>
        ) : (
          <Dropdown
            onClick={() => {
              setDropdownDistrictOpen(!dropdownDistrictOpen)
            }}
          >
            {/* 상권 드롭다운 */}
            <SelectedDistrict>{selectedDistrict} </SelectedDistrict>{' '}
            <ArrowIcon src={down_arrow} />
          </Dropdown>
        )}
      </SelectPlace>
      {/* 행정구 드롭다운 내용 */}
      {dropdownGooOpen && (
        <DropdownBox ref={dropdownRef} $place="goo">
          {goos.map(district => (
            <DropdownContent
              key={district.name}
              onClick={() => {
                setSelectedGoo(district.name)
                setDropdownGooOpen(false)
              }}
            >
              {district.name}
            </DropdownContent>
          ))}
        </DropdownBox>
      )}

      {/* 행정동 드롭다운 내용 */}
      {dropdownDongOpen && (
        <DropdownBox ref={dropdownRef} $place="dong">
          {dongs.map(district => (
            <DropdownContent
              key={district.name}
              onClick={() => {
                setSelectedDong(district.name)
                setDropdownDongOpen(false)
              }}
            >
              {district.name}
            </DropdownContent>
          ))}
        </DropdownBox>
      )}

      {/* 상권 드롭다운 내용 */}
      {dropdownDistrictOpen && (
        <DropdownBox ref={dropdownRef} $place="district">
          {districts.map(district => (
            <DropdownContent
              key={district.name}
              onClick={() => {
                setSelectedDistrict(district.name)
                setDropdownDistrictOpen(false)
              }}
            >
              {district.name}
            </DropdownContent>
          ))}
        </DropdownBox>
      )}
    </Place>
  )
}

export default ChoicePlace
