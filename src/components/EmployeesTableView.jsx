import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const EmployeesTableView = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            const searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });

              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Nummer",
      dataIndex: "nummer",
      key: "key",
    },
    {
      title: "Abteilung",
      dataIndex: "abteilung",
      key: "key",
      filters: [
        { text: 'Buchhaltung', value: 'Buchhaltung' },
        { text: 'IT', value: 'IT' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Vertrieb', value: 'Vertrieb' },
      ],
      onFilter: (value, record) => record.abteilung.includes(value),
    },
  ];

  console.log(data);

  return (
    <>
      <Table dataSource={data} columns={columns}></Table>
    </>
  );
};

export default EmployeesTableView;

// class EmployeesTableView extends React.Component {

//     state = {
//       searchText: '',
//       searchedColumn: '',
//     };

//     getColumnSearchProps = dataIndex => ({
//       filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//         <div style={{ padding: 8 }}>
//           <Input
//             ref={node => {
//               this.searchInput = node;
//             }}
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//             onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ marginBottom: 8, display: 'block' }}
//           />
//           <Space>
//             <Button
//               type="primary"
//               onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//               icon={<SearchOutlined />}
//               size="small"
//               style={{ width: 90 }}
//             >
//               Search
//             </Button>
//             <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//               Reset
//             </Button>
//             <Button
//               type="link"
//               size="small"
//               onClick={() => {
//                 confirm({ closeDropdown: false });
//                 this.setState({
//                   searchText: selectedKeys[0],
//                   searchedColumn: dataIndex,
//                 });
//               }}
//             >
//               Filter
//             </Button>
//           </Space>
//         </div>
//       ),
//       filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//       onFilter: (value, record) =>
//         record[dataIndex]
//           ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//           : '',
//       onFilterDropdownVisibleChange: visible => {
//         if (visible) {
//           setTimeout(() => this.searchInput.select(), 100);
//         }
//       },
//       render: text =>
//         this.state.searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//             searchWords={[this.state.searchText]}
//             autoEscape
//             textToHighlight={text ? text.toString() : ''}
//           />
//         ) : (
//           text
//         ),
//     });

//     handleSearch = (selectedKeys, confirm, dataIndex) => {
//       confirm();
//       this.setState({
//         searchText: selectedKeys[0],
//         searchedColumn: dataIndex,
//       });
//     };

//     handleReset = clearFilters => {
//       clearFilters();
//       this.setState({ searchText: '' });
//     };

//     render() {
//       const columns = [
//         {
//           title: 'Name',
//           dataIndex: 'name',
//           key: 'name',
//           width: '30%',
//           ...this.getColumnSearchProps('name'),
//         },
//         {
//           title: 'Age',
//           dataIndex: 'age',
//           key: 'age',
//           width: '20%',
//           ...this.getColumnSearchProps('age'),
//         },
//         {
//           title: 'Address',
//           dataIndex: 'address',
//           key: 'address',
//           ...this.getColumnSearchProps('address'),
//           sorter: (a, b) => a.address.length - b.address.length,
//           sortDirections: ['descend', 'ascend'],
//         },
//       ];

//       return <Table columns={columns} dataSource={data} />;
//     }
//   }

//   export default EmployeesTableView;
