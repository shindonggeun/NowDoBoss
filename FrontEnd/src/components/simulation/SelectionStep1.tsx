import * as c from '@src/components/styles/simulation/StepStyle'
import useSimulationStore from '@src/stores/simulationStore'
import searchIcon from '@src/assets/SearchIcon.svg'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useState } from 'react'
import { fetchFranchiseList } from '@src/api/simulationApi'
import { FranchiseDataBody } from '@src/types/SimulationType'

interface Step1Props {
  nextStep: () => void
}

const SelectionStep1 = ({ nextStep }: Step1Props) => {
  const { isFranchise, setIsFranchise, brandName, setBrandName } =
    useSimulationStore()
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setBrandName(value)
  }

  const handleBrandClick = (name: string) => {
    setBrandName(name)
    setIsClicked(true)
  }

  const { data, isLoading, refetch } = useQuery<FranchiseDataBody>({
    queryKey: ['SearchFranchise', brandName],
    queryFn: () => fetchFranchiseList(brandName, 0),
  })

  useEffect(() => {
    refetch()
  }, [refetch, brandName])

  useEffect(() => {
    setIsFranchise(null)
    setBrandName(null)
  }, [setBrandName, setIsFranchise])

  return (
    <c.Container>
      <c.Title>
        <c.Emphasis>프렌차이즈</c.Emphasis>
        창업을 생각하고 계신가요?
      </c.Title>

      {isFranchise === null && (
        <c.FranchiseContainer>
          <c.SelectButton
            size="m"
            selected={false}
            type="button"
            onClick={() => {
              setIsFranchise(true)
            }}
          >
            네!
          </c.SelectButton>
          <c.SelectButton
            size="m"
            selected={false}
            type="button"
            onClick={() => {
              setIsFranchise(false)
              nextStep()
            }}
          >
            아니요!
          </c.SelectButton>
        </c.FranchiseContainer>
      )}

      {isFranchise && (
        <div>
          <c.InputContainer
            onClick={() => {
              setIsClicked(false)
            }}
          >
            <c.SearchIcon src={searchIcon} alt="searchIcon" />
            <c.StyledInput
              type="text"
              placeholder="프렌차이즈 이름을 입력해주세요"
              value={brandName !== null ? brandName : undefined}
              onChange={handleInputChange}
            />
          </c.InputContainer>
          <div>
            {!isLoading &&
              data &&
              !isClicked &&
              data.dataBody.map(list => (
                <div key={list.franchiseeId}>
                  <c.StyledButton
                    type="button"
                    onClick={() => handleBrandClick(list.brandName)}
                  >
                    {list.brandName}
                  </c.StyledButton>
                </div>
              ))}
          </div>
          {brandName && (
            <c.Step1ButtonContainer>
              <c.NextButton type="button" onClick={nextStep}>
                다음
              </c.NextButton>
            </c.Step1ButtonContainer>
          )}
        </div>
      )}
    </c.Container>
  )
}

export default SelectionStep1
