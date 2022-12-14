import { Filters, Select, TextField } from "@shopify/polaris";
import React, { useEffect, useMemo, useState } from "react"; 
import { filterHeaders, filterUrl } from "../../../api/apiConstants";

const FilterFeature = ({setAllFilter , allFilter}) => {
  const [filterOptions, setFilterOptions] = useState({
    vendor: [],
    status: [],
    variant: [],
    parent_type: [],
  });
  const inventoryOptions = [
    { label: "Equals", value: "equals" },
    { label: "Not Equals", value: "not equals" },
    { label: "Greater Than or Equals to", value: "greater than or equals to" },
    { label: "Less Than or Equals to", value: "less than or equals to" },
  ];

  const skuOptions = [
    { label: "Equals", value: "equals" },
    { label: "Not Equals", value: "not equals" },
    { label: "Contains", value: "contains" },
    { label: "Does not Contains", value: "does not contains" },
    { label: "Ends With", value: "starts with" },
    { label: "Ends With", value: "ends with" },
  ];
  const vendorOptions = [
    { label: "Equals", value: "equals" },
    { label: "Not Equals", value: "not equals" },
  ];
  useEffect(() => {
    fetch(filterUrl, filterHeaders)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let dt = res.data;
          let vendor = dt.filter((item) => item.title === "Vendor" );
          let status = dt.filter((item) => item.title === "Product status");
          let variant = dt.filter(
            (item) => item.title === "Variant attributes"
          );
          let parent_type = dt.filter((item) => item.title === "Type");
          // console.log({ vendor, status, variant, parent_type });
          setFilterOptions({ vendor, status, variant, parent_type });
        } else alert(res.message);
      });
  }, []);

//   useEffect(()=>{
//     console.log(filterData)
//     setAllFilter({...filterData})
//   },[filterData])





  const filters = [
    {
      key: "inventory",
      label: "Inventory",
      filter: (
        <>
          <Select
            options={inventoryOptions}
            value={allFilter.Inventory.selectValue}
            onChange={(value) => {
              allFilter.Inventory.selectValue = value;
              
              setAllFilter({ ...allFilter });
            }}
          />
          <TextField
            label="Tagged with"
            value={allFilter.Inventory.textValue}
            type={"number"}
            onChange={(value) => {
                allFilter.Inventory.textValue = value;
                allFilter.Inventory.change = value ? true  : false
                setAllFilter({ ...allFilter });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "sku",
      label: "SKU",
      filter: (
        <>
          <Select
            options={skuOptions}
            value={allFilter.SKU.selectValue}
            onChange={(value) => {
                allFilter.SKU.selectValue = value;
                setAllFilter({ ...allFilter });
            }}
          />
          <TextField
            label="Tagged with"
            value={allFilter.SKU.textValue}
            onChange={(value) => {
                allFilter.SKU.textValue = value;
                allFilter.SKU.change = value ? true  : false
                setAllFilter({ ...allFilter });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "tags",
      label: "Tags",
      filter: (
        <>
          <TextField
            label="Tagged with"
            value={allFilter.Tags.textValue}
            onChange={(value) => {
                allFilter.Tags.change = value ? true  : false
                allFilter.Tags.textValue = value;
                setAllFilter({ ...allFilter });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "product_type",
      label: "Product Type",
      filter: (
        <>
          <TextField
            label="Tagged with"
            value={allFilter["Product type"].textValue}
            onChange={(value) => {
                allFilter['Product type'].change = value ? true  : false
                allFilter["Product type"].textValue = value;
                setAllFilter({ ...allFilter });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "vendor",
      label: "Vendor",
      filter: (
        <>
          <Select 
          options={vendorOptions}
          value={allFilter.Vendor.selectValue}
          onChange={(value) => {
            allFilter.Vendor.selectValue = value;
            setAllFilter({...allFilter})
          }}
           />
          <Select 
            options={filterOptions.vendor}
            value={allFilter.Vendor.textValue}
            onChange={(value) =>{
                allFilter.Vendor.change = value ? true  : false
                allFilter.Vendor.textValue = value;
                setAllFilter({...allFilter})
            }} 
        />
        </>
      ),
    },
    {
      key: "template",
      label: "Template Name",
      filter: (
        <Select 
            value="No template found"
            disabled
        />
      ),
    },
    {
      key: "product_status",
      label: "Product Status",
      filter: <Select 
        options={filterOptions.status} 
        value={allFilter["Product Status"].selectValue}
        onChange={(value)=>{
            allFilter["Product Status"].change = value ? true  : false
            allFilter["Product Status"].selectValue = value
            setAllFilter({...allFilter})
        }}
        />,
    },
    {
      key: "variant",
      label: "Variant Attributes",
      filter: <Select 
      options={filterOptions.variant} 
      value={allFilter["Variant attributes"].textValue}
      onChange={(value)=>{
        allFilter["Variant attributes"].change = value ? true  : false
        allFilter["Variant attributes"].textValue = value
        setAllFilter({...allFilter})
    }}
      />,
    },
    {
      key: "activity",
      label: "Activity",
      filter: (
        <>
          <TextField
            label="Tagged with"
            value={allFilter.Activity.textValue}
            onChange={(value) => {
                allFilter.Activity.change = true
                allFilter.Activity.textValue = value;
                setAllFilter({ ...allFilter });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "type",
      label: "Type",
      filter: <Select options={filterOptions.parent_type} 
        value={allFilter.Type.selectValue}
        onChange={(value)=>{
            allFilter.Type.change = value
            allFilter.Type.selectValue = value
            setAllFilter({...allFilter})
        }}

      />,
    },
  ];

  const removeFilter = (key) =>{
    console.log('clearAll');
    allFilter[key].change = false
    allFilter[key].textValue = ''
    console.log(allFilter[key]);
    setAllFilter({...allFilter})
  }
  const removeAllFilter = () =>{
    Object.keys(allFilter).map((item)=>{
        allFilter[item].change = false
        allFilter[item].textValue = ''
    })
    setAllFilter({...allFilter})
  }
  const appliedFilters = useMemo(()=>{
    let t = []
    Object.keys(allFilter).map(item =>{
        if(allFilter[item].change){
            t.push( {
                key : allFilter[item].value,
                label : disambiguateLabel(item , allFilter[item].searchvalue , allFilter[item].textValue),
                onRemove : ()=>removeFilter(item)
            })
        }
    })
    return t
  },[allFilter])




  return (
    <>
    <Filters 
        filters={filters || []}
        // appliedFilters={[...appliedFilters]}
        onClearAll={removeAllFilter}
        hideQueryField
    >
    </Filters>
    </>
    
  )
  function disambiguateLabel(key, select , text) {
    return `${key} ${select} ${text}`
  }
};

export default FilterFeature;
