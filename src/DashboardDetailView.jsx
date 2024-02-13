// // react-grid-layout library 가져오기
// import {Responsive, WidthProvider} from 'react-grid-layout'
// import {useState} from 'react';
//
//
// // responsive grid 생성
// const ResponsiveGridLayout = WidthProvider(Responsive)
//
// const DashboardDetailView = () => {
//     const [state, setState] = useState({
//         breakpoints: 'lg',
//         layouts:{ lg: [] },
//     })
//
//     const onLayoutChange = (layout, layouts) => {
//         setState((state) => ({
//             ...state,
//             layouts: layouts,
//             }))
//     }
//     //breakpoint 변경
//     const onBreakPointChange = (breakpoint) => {
//         setState((state) => ({
//            ...state,
//            breakpoints: breakpoint,
//         }))
//     }
//     return(
//         <ResponsiveGridLayout
//             layouts={state.layouts}
//             breakpoints={{
//                 lg: 1200,
//                 md: 996,
//                 sm: 768,
//                 xs: 480,
//                 xxs: 0,
//             }}
//             cols={{lg:12, md:10, sm:6, xs:4, xxs:2}}
//             rowHeight={150}
//             width={1000}
//             onLayoutChange={onLayoutChange}
//             onBreakpointChange={onBreakPointChange}
//             isResizable={true}
//             >
//             {widgetList.map((widget, index) => (
//                 <Grid item key={widget.widgetId}>
//                     <WidgetCard>
//                         title={widget.widgetTitle}
//                         widgetInfo={widget}
//                         getWidgetData={getWidgetData}
//                     </WidgetCard>
//                     <WidgetComponent widgetInfo={widget}/>
//                 </Grid>
//             ))}
//         </ResponsiveGridLayout>
//
//     )
//
// }
// export default DashboardDetailView;