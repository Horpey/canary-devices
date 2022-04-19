import styled from "styled-components";

export const StylesWrapper = styled.div`
  .dashSidebarsm {
    padding: 17px 0px;
    .dashSteps {
      list-style: none;
      padding: 0px;
      margin: 0;
      display: flex;
      padding: 17px 8px;
      .dashStep {
        .dash {
          text-align: center;
          padding: 0px 8px;
        }
        &:last-child {
          .count {
            &::after {
              content: "";
              position: absolute;
              width: 0px;
              height: 0px;
            }
          }
        }
        .count {
          background: white;
          color: #4221b3;
          font-weight: bold;
          width: 27px;
          border-radius: 52px;
          height: 27px;
          line-height: 2.45;
          text-align: center;
          font-size: 12px;
          margin: 0 auto 6px;
          position: relative;
          &.active {
            background: #00bbfe;
            border: 2px solid white;
            color: white;
            line-height: 2;
          }
          &::after {
            content: "";
            position: absolute;
            width: 39px;
            height: 2px;
            left: 48px;
            bottom: 11px;
            border-top: 1px dashed white;
          }
        }
        span {
          font-weight: 500;
          color: white;
          font-size: 12px;
          line-height: 0.5;
        }
      }
    }
  }
  .dashLayout {
    height: 100vh;
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
    display: flex;
    .dashMain {
      overflow: auto;
      height: 100%;
      padding: 0;
      flex-grow: 1 !important;
      .dashMainSection {
        // padding: 30px 40px 0px 46px;

        background: white;
        min-height: 100vh;
        padding: 50px;
      }
    }
    .dashSidebar {
      text-align: center;
      display: inline-flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: justify;
      justify-content: space-between;
      height: 100vh;
      width: 293px;
      color: #ffffff;
      border-right: 1px solid #f08613;
      background: white;
      .dashSidebarContent {
        padding: 51px 56px 0px 68px;
        text-align: left;
      }
      .dashSteps {
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        overflow: auto;
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
        margin: 10px 0;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 8px 25px;
        list-style: none;
        margin-top: 40px;
        .dashStep {
          justify-content: space-between;
          align-items: center;
          text-align: left;
          -webkit-box-pack: justify;

          div .dashStepIcon {
            padding: 13px 14px;
            background: transparent;
            border-radius: 6px;
            margin-bottom: 13px;
            display: block;
            transition: all 0.3s ease-in-out;
            span {
              font-size: 16px;
              color: #000;
              padding-left: 20px;
              font-weight: 100;
            }
            div {
              display: flex;
              align-items: center;
            }
            &:hover {
              background: #f0861321;
              color: #f08613;
              div {
                span {
                  color: #f08613;
                }
                svg path {
                  fill: #f08613;
                }
              }
            }
            &.active {
              background: #f0861321;
              div {
                span {
                  color: #f08613;
                }
                svg path {
                  fill: #f08613;
                }
              }
            }
          }
          &:last-child {
            .d-flex {
              .count {
                &::after {
                  content: "";
                  position: absolute;
                  width: 0px;
                  height: 0px;
                }
              }
            }
          }
          .d-flex {
            span {
              font-size: 15px;
              font-weight: 500;
              padding-left: 16px;
            }
            .count {
              background: white;
              color: #4221b3;
              font-weight: bold;
              width: 34px;
              border-radius: 52px;
              height: 34px;
              line-height: 2.45;
              text-align: center;
              position: relative;
              &.active {
                background: #00bbfe;
                border: 2px solid white;
                color: white;
              }
              &::after {
                content: "";
                position: absolute;
                width: 7px;
                height: 49px;
                left: 15px;
                bottom: -50px;
                border-left: 1px dashed white;
              }
            }
          }
        }
      }
      .dashSidebarFooter {
        text-align: center;
        margin: 0 13px 34px;
        padding: 18px 0;
        .ant-avatar-image {
          outline: thick solid #4221b3;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .dashLayout .dashMain .dashMainSection {
      // padding: 22px 22px;
    }
  }
`;
