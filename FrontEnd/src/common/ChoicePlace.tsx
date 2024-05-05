import { useEffect, useRef, useState } from 'react'
import down_arrow from '@src/assets/arrow_down.svg'
import styled from 'styled-components'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'
import { useQuery } from '@tanstack/react-query'
import { fetchAdministrationList, fetchDongList } from '@src/api/mapApi'
import { useLocation } from 'react-router-dom'

const Place = styled.div`
  margin: 10px 10px;
  text-align: left;
`

const Content = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`

const SelectPlace = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
`

const Dropdown = styled.div`
  border-bottom: 0.1rem solid #626262;
  width: 100px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin: 5px 0 0 20px;
  position: relative;
`

const SelectedContent = styled.div`
  text-align: right;
  font-weight: 500;
  width: 65%;
  white-space: nowrap; /* 내용을 한 줄로 표시 */
  overflow: hidden; /* 내용이 너비를 넘어가면 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */
`
const SelectedDistrict = styled.div`
  text-align: center;
  font-weight: 500;
  width: 60%;
  margin-left: 20%;
  white-space: nowrap; /* 내용을 한 줄로 표시 */
  overflow: hidden; /* 내용이 너비를 넘어가면 숨김 처리 */
  text-overflow: ellipsis; /* 넘치는 내용을 ...으로 표시 */
`
const ArrowIcon = styled.img``
const DropdownBox = styled.div<{ $place: string; $recommend: boolean }>`
  position: absolute;
  overflow-y: auto;
  height: 60%;
  background-color: #ffffff;
  right: ${({ $place, $recommend }) => {
    const placeToRight: { [key: string]: string } = $recommend
      ? {
          goo: '52%',
          dong: '12%',
        }
      : {
          goo: '65%',
          dong: '36.7%',
          district: '6.5%',
        }
    return placeToRight[$place] || 'default'
  }};
  width: 100px;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;

  @media only screen and (max-width: 400px) {
    right: ${({
      $place,
      $recommend,
    }: {
      $place: string
      $recommend: boolean
    }) => {
      const placeToRight: { [key: string]: string } = $recommend
        ? {
            goo: '51%',
            dong: '22%',
          }
        : {
            goo: '64%',
            dong: '36%',
            district: '7%',
          }
      return placeToRight[$place] || 'default'
    }};
    width: 100px;
    height: 15vh;
    overflow-y: scroll;
  }

  ${({ $recommend }) =>
    !$recommend &&
    `
  @media only screen and (max-width: 680px) {
  right: ${({ $place }: { $place: string }) => {
    const placeToRight: { [key: string]: string } = {
      goo: '65%',
      dong: '35%',
      district: '5%',
    }
    return placeToRight[$place] || 'default'
  }};
  width: 23%;
}
`}
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

  // 상권 추천 페이지인지 확인하는 로직
  const [isRecommendPage, setIsRecommendPage] = useState(false)

  useEffect(() => {
    if (location.pathname === '/recommend') {
      setIsRecommendPage(true)
    } else {
      setIsRecommendPage(false)
    }
  }, [location])

  // 드롭다운 열렸는지 여부
  const [dropdownGooOpen, setDropdownGooOpen] = useState<boolean>(false)
  const [dropdownDongOpen, setDropdownDongOpen] = useState<boolean>(false)
  const [dropdownCommercialOpen, setDropdownCommercialOpen] =
    useState<boolean>(false)

  // 드롭다운 열었을 때 다른 곳 눌러도 드롭다운 닫히게 하는 ref
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // store에 저장된 구 데이터와 선택한 구, 동, 상권 값 가져올 store
  const {
    goosData,
    // 선택한 구, 동, 상권
    selectedGoo,
    selectedDong,
    selectedCommercial,
    // 구, 동, 상권 데이터 set
    setSelectedGoo,
    setSelectedDong,
    setSelectedCommercial,
    // 동, 상권 데이터 목록
    setSaveDongList,
    setSaveCommercialList,
  } = useSelectPlaceStore()

  // 구 선택 시 동 목록 조회하는 useQuery
  const { data: dongListData } = useQuery({
    queryKey: ['fetchDongList', selectedGoo],
    queryFn: () => fetchDongList(selectedGoo.code),
  })

  // 동 선택 시 상권 목록 조회하는 useQuery
  const { data: commercialListData } = useQuery({
    queryKey: ['fetchAdministrationList', selectedDong],
    queryFn: () => fetchAdministrationList(selectedDong.code),
  })

  // 동, 상권 목록 불러오면 store에 저장해서 map에서 재사용할 수 있도록 설정
  useEffect(() => {
    if (dongListData) {
      setSaveDongList(dongListData?.dataBody)
    }
    if (commercialListData) {
      setSaveCommercialList(commercialListData?.dataBody)
    }
  }, [commercialListData, dongListData, setSaveDongList, setSaveCommercialList])

  // 드롭다운 열었을 때 외부 클릭 시 드롭다운 닫히게 하는 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownGooOpen(false)
        setDropdownDongOpen(false)
        setDropdownCommercialOpen(false)
      }
    }

    // 드롭다운이 열려있을 때만 이벤트 리스너 추가
    if (dropdownGooOpen || dropdownDongOpen || dropdownCommercialOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // 컴포넌트 언마운트 혹은 드롭다운이 닫힐 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownGooOpen, dropdownDongOpen, dropdownCommercialOpen]) // 드롭다운 상태 변경 시 useEffect 재실행

  // // 지도 선택 시 선택된 값 바뀌었을 때 드롭다운에도 갱신
  // useEffect(() => {
  //   setSelectedGoo(selectedGoo.name)
  //   setSelectedDong(selectedDong.name)
  //   setSelectedCommercial(selectedCommercial.name)
  // }, [selectedGoo, selectedDong, selectedCommercial])
  return (
    <Place>
      {isRecommendPage ? (
        ''
      ) : (
        <Content>분석하고 싶은 상권을 선택해주세요.</Content>
      )}

      <SelectPlace ref={dropdownRef}>
        {/* 행정구 드롭다운 */}
        <Dropdown
          onClick={() => {
            setDropdownGooOpen(!dropdownGooOpen)
          }}
        >
          <SelectedContent>{selectedGoo.name}</SelectedContent>
          <ArrowIcon src={down_arrow} />
        </Dropdown>

        {/* 행정동 드롭다운 */}
        <Dropdown
          onClick={() => {
            if (selectedGoo.name !== '행정구') {
              setDropdownDongOpen(!dropdownDongOpen)
            } else {
              console.log(' 구를 먼저 선택해주세요')
            }
          }}
        >
          <SelectedContent>{selectedDong.name}</SelectedContent>
          <ArrowIcon src={down_arrow} />
        </Dropdown>

        {
          isRecommendPage ? (
            ''
          ) : (
            <Dropdown
              onClick={() => {
                if (selectedDong.name !== '행정동') {
                  setDropdownCommercialOpen(!dropdownCommercialOpen)
                } else {
                  console.log(' 동을 먼저 선택해주세요')
                }
              }}
            >
              {/* 상권 드롭다운 */}
              <SelectedDistrict>{selectedCommercial.name}</SelectedDistrict>
              <ArrowIcon src={down_arrow} />
            </Dropdown>
          )
          //   : (
          //   ''
          // )
        }
      </SelectPlace>
      {/* 행정구 드롭다운 내용 */}
      {dropdownGooOpen && (
        <DropdownBox
          ref={dropdownRef}
          $place="goo"
          $recommend={isRecommendPage}
        >
          {goosData.map(district => (
            <DropdownContent
              key={district.gooName}
              onClick={() => {
                // store에 선택 값 저장
                setSelectedGoo({
                  name: district.gooName,
                  code: district.gooCode,
                })
                // 하위 선택값 초기화
                setSelectedDong({
                  name: '행정동',
                  code: 0,
                })
                setSelectedCommercial({
                  name: '상권',
                  code: 0,
                })
                setDropdownGooOpen(false)
              }}
            >
              {district.gooName}
            </DropdownContent>
          ))}
        </DropdownBox>
      )}

      {/* 행정동 드롭다운 내용 */}
      {dropdownDongOpen && (
        <DropdownBox
          ref={dropdownRef}
          $place="dong"
          $recommend={isRecommendPage}
        >
          {dongListData?.dataBody.map(dong => (
            <DropdownContent
              key={dong.administrationCode}
              onClick={() => {
                // store에 선택 값 저장
                setSelectedDong({
                  name: dong.administrationCodeName,
                  code: dong.administrationCode,
                })
                // 하위 선택값 초기화
                setSelectedCommercial({
                  name: '상권',
                  code: 0,
                })
                setDropdownDongOpen(false)
              }}
            >
              {dong.administrationCodeName}
            </DropdownContent>
          ))}
        </DropdownBox>
      )}

      {/* 상권 드롭다운 내용 */}
      {dropdownCommercialOpen && (
        <DropdownBox
          ref={dropdownRef}
          $place="district"
          $recommend={isRecommendPage}
        >
          {commercialListData?.dataBody.map(district => (
            <DropdownContent
              key={district.commercialCode}
              onClick={() => {
                // store에 선택 값 저장
                setSelectedCommercial({
                  name: district.commercialCodeName,
                  code: district.commercialCode,
                })
                setDropdownCommercialOpen(false)
              }}
            >
              {district.commercialCodeName}
            </DropdownContent>
          ))}
        </DropdownBox>
      )}
    </Place>
  )
}

export default ChoicePlace
