filterCity = () => {
    let distinctCity = [];
    this.state.datas.map((obj) => distinctCity.push(obj.city));
    distinctCity = [...new Set(distinctCity)];
    return distinctCity;
  };


<select
className="search_city form-control"
onChange={this.searchFromCity}
id="state"
>
<option value="" disabled selected>
  Select City
</option>
{this.filterCity().map((state, index) => (
  <option value={state} key={index}>
    {state}
  </option>
))}
</select>
