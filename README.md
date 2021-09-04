# Query Schools API

Query schools API is a free API which provides data of schools present all over the India.
Generate your authToken from here

##### Each authToken have a limit of 50 query/day for 1 month. All tokens will be expired after one month from the date of creation.

## Uses

- Create your token send **_`POST`_** to **/api/create/token**
- Get school data by affliation code send **_`GET`_** to **get/:authToken/aff/:affCode**
- Get school data by school Name send **_`GET`_** to **/get/:authToken/name/:schoolName**
- Get school data by affliation code send **_`GET`_** to **/get/:authToken/pin/:pinCode**
- Get school data by city name send **_`GET`_** to **/get/:authToken/city/:districtName**
- Get school data by region name send **_`GET`_** to **/get/:authToken/region/:regionName**
- Get school data by state name send **_`GET`_** to **/get/:authToken/state/:stateName**

## Response

> **_/api/create/token_**

```javascript
{
   "message":"Token generated successfully",
   "data":{
      "email":"testuser@test.com",
      "token":"swnvlss6pz8",
      "tokenExpiration":"2021-10-04T20:11:32.288Z",
      "dailyLimit":50,
      "dailyLimitExpiration":"2021-09-05T20:11:32.288Z",
      "_id":"6133d2f7fe4ee56e7fc6a760",
      "createdAt":"2021-09-04T20:11:35.278Z",
      "updatedAt":"2021-09-04T20:11:35.278Z",
      "__v":0
   }
}
```

> Other routes response for school data are similar to below .
> **_get/:authToken/aff/:affCode_**

```javascript
[
  {
    _id: "610b328aa65c608836bf4f7a",
    name: "TOOLIKA PUBLIC SCHOOL",
    aff_no: "2131004",
    state: "UTTAR PRADESH",
    district: "GHAZIPUR",
    region: "ALLAHABAD",
    address: "JAMUNA DEVA, MAU ROAD, GHAZIPUR",
    pincode: "233001",
    ph_no: "03874",
    off_ph_no: "2230580",
    res_ph_no: "233584",
    email: "bmuadhyay54480@gmail.com",
    year_found: "2006",
    date_opened: "Apr 2, 2006",
    princi_name: "KAPIL DEO UPADHYAY",
    sex: "2",
    princi_qual: "M.A, B.ED",
    princi_exp_adm: "2",
    princi_exp_teach: "6",
    status: "Senior Secondary",
    aff_type: "Provisional",
    aff_start: "Apr 1, 2014",
    aff_end: "Mar 31, 2019",
    soc_name: "SAURABH EDUCATIONAL AND WELFARE SOCIETY",
    l_nearest_railway: "GHAZIPUR CITY",
    l_nearest_railway_dist: "5.00",
    l_nearest_police: "GHAZIPUR CITYJANGIPUR",
    l_nearest_police_dist: "4.00",
    l_nearest_bank: "SBI",
    l_nearest_bank_dist: "3.00",
    n_category: "Co-educational",
    n_medium: "English",
    n_school_type: "Independent",
    e_nursery_sections: "0",
    e_nursery_students: "0",
    e_i_v_sections: "1",
    e_i_v_students: "205",
    e_vi_viii_sections: "1",
    e_vi_viii_students: "121",
    e_ix_x_sections: "0",
    e_ix_x_students: "0",
    e_xi_xii_sections: "0",
    e_xi_xii_students: "0",
    i_classrooms_no: "9",
    i_classrooms_length: "30.00",
    i_classrooms_breadth: "20.00",
    i_composite_lab_no: "1",
    i_composite_lab_length: "30.00",
    i_composite_lab_breadth: "20.00",
    i_phy_lab_no: "0",
    i_phy_lab_length: "0.00",
    i_phy_lab_breadth: "0.00",
    i_chem_lab_no: "0",
    i_chem_lab_length: "0.00",
    i_chem_lab_breadth: "0.00",
    i_bio_lab_no: "0",
    i_bio_lab_length: "0.00",
    i_bio_lab_breadth: "0.00",
    i_math_lab_no: "1",
    i_math_lab_length: "20.00",
    i_math_lab_breadth: "10.00",
    i_cs_lab_no: "1",
    i_cs_lab_length: "20.00",
    i_cs_lab_breadth: "20.00",
    i_home_lab_no: "0",
    i_home_lab_length: "0.00",
    i_home_lab_breadth: "0.00",
    i_library_no: "1",
    i_library_length: "47.00",
    i_library_breadth: "30.00",
    i_other_lab_no: "1",
    i_other_lab_length: "30.00",
    i_other_lab_breadth: "20.00",
    t_ntts_no: "0",
    t_ntts_trained: "0",
    t_ntts_untrained: "0",
    t_prts_no: "7",
    t_prts_trained: "6",
    t_prts_untrained: "1",
    t_tgts_no: "5",
    t_tgts_trained: "4",
    t_tgts_untrained: "1",
    t_librarians_no: "1",
    t_librarians_trained: "1",
    t_librarians_untrained: "0",
    t_ptis_no: "1",
    t_ptis_trained: "1",
    t_ptis_untrained: "0",
    t_pgts_no: "0",
    t_pgts_trained: "0",
    t_pgts_untrained: "0",
    t_exec_no: "0",
    t_exec_trained: "0",
    t_exec_untrained: "0",
    p_area_meter: "8255.59",
    p_area_acre: "2.04",
    p_area_builtup_meter: "1166.00",
    p_num_sites: "ONE",
    p_area_playground: "3100.00",
    p_urinal_type: "flush",
    p_boys_urinal: "12",
    p_girls_urinal: "12",
    p_potable_water: "yes",
    p_health_cert: "yes",
    f_total_books: "1650",
    f_periodicals: "3",
    f_dailies: "2",
    f_reference_books: "0",
    f_magazine: "5",
    f_swimming_pool: "no",
    f_indoor_games: "yes",
    f_dance_rooms: "yes",
    f_gym: "no",
    f_music_rooms: "no",
    f_hostel: "no",
    f_health_checkup: "yes",
  },
];
```

---

> If you want to host it for some other purpose. Follow the bellow Installation steps -

### Installation

create a **.env** file paste **_MONGO*URI = \_yourMongoConnectionString*_**
then install packages

```javascript
npm install

npm run dev
or
npm start
```
