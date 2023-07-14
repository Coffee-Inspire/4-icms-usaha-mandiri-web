import moment from "moment";
import convertIDR from "../../helpers/convertIDR";
import { webDirect } from "../../appsetting/config";

export default (data) => {
  const textHeader = `Usaha%20Mandiri%20-%20Pemesanan%20barang%0ANomor%20Pemesanan%20${data.incoming_no}`;
  //   const detailsURL = `${host}/app/incoming/detail/${data.id}%20`;
  const detailsURL = `${webDirect}/app/incoming/detail/${data.id}%20`;
  const textBody = `%0ATotal%20Pemesanan:%20Rp%20${convertIDR(
    data.total_purchase
  )}%0A
Tanggal%20Pemesanan:%20${moment(data.purchase_date).format("DD-MM-YYYY")}%0A
Tanggal%20Jatuh%20Tempo:%20${moment(data.deadline_date).format("DD-MM-YYYY")}%0A
`;
  const fullText = textHeader + "%0A%0A" + detailsURL + "%0A" + textBody;
  return fullText;
};
