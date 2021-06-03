// <!-- x (x + 1) = 0 -->
// <equation>
//   <member>
//     <product>
//       <factor>x</factor>
//       <factor>
//         <sum>
//           <term>x</term>
//           <term>1</term>
//         </sum>
//       </factor>
//     </product>
//   </member>
//   <member>0</member>
// </equation>
//
// <!-- 2x^2 + 3x - 1 = 0 -->
// <equation>
//   <member>
//     <sum>
//       <term>
//         2x<sup>2</sup>
//       </term>
//       <term>
//         3x
//       </term>
//       <term>
//         -1
//       </term>
//     </sum>
//   </member>
//   <member>0</member>
// </equation>
//
// <!-- x = y = ±5V2 -->
// <equation>
//   <member>
//     x
//   </member>
//   <member>
//     y
//   </member>
//   <member>
//     <product>
//       <factor>
//         ±5
//       </factor>
//       <factor>
//         <root>2</root>
//       </factor>
//     </product>
//   </member>
// </equation>
//
// <!-- x = 3V27 -->
// <equation>
//   <member>
//     x
//   </member>
//   <member>
//     <cuberoot>27</cuberoot>
//   </member>
// </equation>
//
// <!-- x = 1 or x = -4 -->
// <equation>
//   <or>
//     <atom>
//       <equation>
//         <member>
//           x
//         </member>
//         <member>
//           1
//         </member>
//       </equation>
//     </atom>
//     <atom>
//       <equation>
//         <member>
//           x
//         </member>
//         <member>
//           -4
//         </member>
//       </equation>
//     </atom>
//   </or>
// </equation>
// 
// <!-- quadratic formula -->
// <equation>
//   <member>
//     x<sub>1,2</sub>
//   </member>
//   <member>
//     <fraction>
//       <numerator>
//         <sum>
//           <term class="minus">
//             b
//           </term>
//           <term class="plusminus">
//             <root>
//               <sum>
//                 <term>
//                   b<sup>2</sup>
//                 </term>
//                 <term class="minus">
//                   4ac
//                 </term>
//               </sum>
//             </root>
//           </term>
//         </sum>
//       </numerator>
//       <denominator>
//         2a
//       </denominator>
//     </fraction>
//   </member>
// </equation>

function parse(str) {
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(str, "text/xml");
        // (new DOMParser()).parseFromString(document.getElementById('quadratic').outerHTML, 'text/xml')
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(str);
    }
    return xmlDoc;
}




/**
 * +5
 * -5x
 * +-x
 * x
 * x2
 * 5x2
 * -x3
 */
function term(a) {
    //let [ sign, factor, x, power ] = a.match(/^(+|-|+-|±)?(\d*)(?:(x)(\d*))?/);
    let [ _total, sign, number, factor, power ] = a.match(/^([-+]|\+-|±)?(?:(\d+)|(?:(\d*)x(\d*)))$/);
    if (sign == '+-') {
        sign = '±';
    }
    if (number) {
        return `${sign}${number}`;
    } else {
        return `${sign}${factor}x<sup>${power}</sup>`;
    }
}
