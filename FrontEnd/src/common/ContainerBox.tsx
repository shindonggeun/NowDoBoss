import styled from 'styled-components'

interface BoxProps {
  height: number
}

const ContainerBox = styled.div<BoxProps>`
  height: ${props => props.height}px;
  width: 100%;
`

const EmptyContainer = ({ height }: BoxProps) => {
  return <ContainerBox height={height} />
}

export default EmptyContainer
