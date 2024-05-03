import styled from '@emotion/styled'

export const StyledGeoMapPopover = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border: 1px solid black;
  min-width: 350px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 5px;

    h3 {
      text-decoration: underline;
      font-weight: bold;
      margin: 0;
      font-size: 14px;
    }

    .close-icon {
      cursor: pointer;
    }
  }

  .listing {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .org-title {
      text-decoration: underline;
      color: gray;
      font-size: 14px;
    }

    .student-list {
      display: flex;
      flex-direction: column;
      justify-items: center;
      gap: 5px;
      margin-top: 5px;

      .student-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .student-name {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
`
