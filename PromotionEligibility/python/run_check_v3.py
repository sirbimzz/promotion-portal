# \-*- coding: utf-8 -*-
"""
Created on Sat Mar 13 13:12:47 2021

Process Staff data from SAP and A&P for promotion eligibility

@author: Nasiru.Ibrahim
"""

import json
import datetime
import pandas as pd
import math

root_folder = r"E:/Digital/datacentric/promotion/PromotionEligibility"

#root_folder = r"\\BNY-S-560\Digital\datacentric\promotion\PromotionEligibility"

def config_read():
    # importing configuration settings
    CEPspool_file = ""
    IPFspool_file = ""
    AP_ops_file = ""
    AP_tech_file = ""
    Staffspool_file = ""
    Promotspool_file = ""
    Output_file = ""
    try:
        with open(root_folder + '/settings/configv2.json') as json_file:
            config = json.load(json_file)
            CEPspool_file = config['CEPspool_file']
            IPFspool_file = config['IPFspool_file']
            AP_ops_file = config['A&P_Ops_file']
            AP_tech_file = config['A&P_Tech_file']             
            Staffspool_file = config['Staffspool_file']
            Promotspool_file = config['Promotspool_file']
            Output_file = config['Output_file']
        success = True
        error = ""
    except Exception as e:
        success = False
        error = "Error in reading configuration " + str(e)    
    return success, error, CEPspool_file, IPFspool_file, AP_ops_file, AP_tech_file, Staffspool_file, Promotspool_file, Output_file

def sb_files():
    try:
        with open(root_folder + '/settings/sb_ops_file.json') as json_file:
            sb_ops = json.load(json_file)
        success = True
        error = ""
    except Exception as e:
        success = False
        error = "Error in reading Skill Blocks data. " + str(e)
        
    """
    print("")
    print("*******Skill blocks requirment for Ops***************")
    print(sb_ops)
    """    
    return success, error, sb_ops


def jg_codes():
    try:
        with open(root_folder + '/settings/JG_codes.json') as json_file:
            JG_codes = json.load(json_file)
        success = True
        error = ""
    except Exception as e:
        success = False
        error = str(e)
    return JG_codes, success, error


def APdata_process(df1, df2, df):
    #POX, POL AND POS STAFF
    success, error, sb_ops = sb_files()
    skill_blk_req = pd.DataFrame(sb_ops.items(), columns=['PS group', 'sbReq'])    
    skill_blk_req['PS group'] = skill_blk_req['PS group'].str[2:].values.astype(int)
    try:
        df1.drop('PS group', inplace=True, axis=1)
    except:
        "Do nothin"
    df1 = df1.merge(df[['Pers.No.','Ref. Ind.','PS group']], on='Pers.No.', how='left')    #obtaining Ref Ind, PS group from staff spool
    df1["PS group"] = pd.to_numeric(df1["PS group"])
    df1 = df1.merge(skill_blk_req, on="PS group", how="left")
    
    #replacing skill block requirement for Lab staff
    df1.loc[(df1['Ref. Ind.'].str[:3]=="POL") & (df1['PS group']==11), "sbReq"] = 1
    df1.loc[(df1['Ref. Ind.'].str[:3]=="POL") & (df1['PS group']==12), "sbReq"] = 2
    df1.loc[(df1['Ref. Ind.'].str[:3]=="POL") & (df1['PS group']==13), "sbReq"] = 3
    df1.loc[(df1['Ref. Ind.'].str[:3]=="POL") & (df1['PS group']==14), "sbReq"] = 3
    
    #for POS staff SB must be at least 9 for all staff
    df1.loc[df1['Ref. Ind.'].str[:3]=="POS",'sbReq'] = 9
    
    df1['sbCriteria'] = "NO"                                                                #preset all sbCriteria as NO
    df1.loc[df1['SB']>=df1['sbReq'], 'sbCriteria'] = "YES"                                  #checking where SB requiements are met
    
    #TECHNICIANS
    df2_req = pd.DataFrame({'PS group': [11,12,13,14,15,16],'level1_req':[100,100,100,100,100,100],
                            'level2_req':[80,100,100,100,100,100],'level3_req':[0,80,100,100,100,100],
                            'E1_req':[0,0,0,90,100,100],'E2_req':[0,0,0,0,80,80],
                            'E3_req':[0,0,0,0,0,80]})
    df2_req = df2_req.apply(pd.to_numeric)
    try:
        df2 = df2.replace('%','',regex=True)
    except:
        "do nothing if no % found"
    df2 = df2.apply(pd.to_numeric)
    df2 = df2.merge(df[['Pers.No.','Ref. Ind.','PS group']], on='Pers.No.', how='left')    #obtaining Ref Ind, PS group from staff spool
    df2["PS group"] = pd.to_numeric(df2["PS group"])
    df2 = df2.merge(df2_req, on='PS group', how='left')
    
    df2['sbCriteria'] = "NO"
    df2.loc[(df2['Level1 ']>=df2['level1_req'])&(df2['Level 2']>=df2['level2_req'])&(df2['Level 3']>=df2['level3_req'])
            &(df2['E1']>=df2['E1_req'])&(df2['E2']>=df2['E2_req'])&(df2['E3']>=df2['E3_req']),'sbCriteria'] = "YES"    
    df2.loc[df2['PS group']==17,'sbCriteria'] = "N/A"
    df2=df2.assign(SB="multiple",sbReq="multiple")
    
    df_all = pd.concat([df1[['Pers.No.','SB','sbReq','sbCriteria']],df2[['Pers.No.','SB','sbReq','sbCriteria']]], axis=0)
    #print(df_all)
    return df_all, success, error


def data_frame(data, new_data):
    combined_data = pd.DataFrame
    try:
        new_data.set_index('Pers.No.', drop=True, inplace=True)
        combined_data = pd.concat([data, new_data], axis=1)
        success = True
        error = ""
    except Exception as e:
        success = False
        error = "Failed to process and combine data due to -->" + str(e)
    return combined_data, success, error


def avg_ipf(ipf_raw):
    #new modification due to different data format for IPF spool
    ipf_raw.columns = ipf_raw.columns.str.replace(" IPF", "")
    ipf_raw = ipf_raw.replace(to_replace=r'^.-.*$', value='', regex=True)
    emplyees = ipf_raw['Pers.No.'].tolist()        
    
    #emplyees = ipf_raw['Pers.No.'].unique().tolist()               #removed with modification
    ipf_data = pd.DataFrame()
    ipf_concat = pd.DataFrame()
    i = 0
    for emplyee in emplyees:
        IPF = ""
        #new modification
        df_trans = ipf_raw.loc[ipf_raw['Pers.No.']==emplyee]         
        df_trans = df_trans.drop('Pers.No.', axis=1).T
        df_trans['Pers.No.'] = emplyee        
        df_trans['Start Date'] = df_trans.index
        df_trans['1.pnt'] = df_trans[i]
        
        
        df_trans.drop(i, inplace=True, axis=1)
        i+=1
        df_trans.reset_index(drop=True, inplace=True)
        
        emplyee_IPF = df_trans
        emplyee_IPF['Start Date'] = pd.to_datetime(emplyee_IPF['Start Date'])
        
        emplyee_IPF.sort_values(by=['Start Date'])
        ipf_concat = pd.concat([ipf_concat, emplyee_IPF], axis=0)
        
        #remove periods of blank CEPs and study leave/career breaks        
        emplyee_IPF['1.pnt'] = pd.to_numeric(emplyee_IPF['1.pnt'], errors='coerce')
        last_ipf_nan = math.isnan(emplyee_IPF['1.pnt'][len(emplyee_IPF.index) - 1])
        nemplyee_IPF = emplyee_IPF.loc[~emplyee_IPF['1.pnt'].isnull()]
        no_ipfs = len(nemplyee_IPF.index)
        if not last_ipf_nan:
            if (no_ipfs>=3):
                #only last three ipfs (not sequential for those on studyleave/career break)
                nemplyee_IPF = nemplyee_IPF.tail(3)
                nemplyee_IPF['1.pnt'] = pd.to_numeric(nemplyee_IPF['1.pnt'])
                IPF = round(nemplyee_IPF['1.pnt'].mean(),2)
                ipf_data = pd.concat([ipf_data,pd.DataFrame({'Pers.No.':[emplyee],'yr1IPF':[nemplyee_IPF['1.pnt'].iloc[0]],\
                                                         'yr2IPF':[nemplyee_IPF['1.pnt'].iloc[1]],\
                                                         'yr3IPF':[nemplyee_IPF['1.pnt'].iloc[2]],'avgIPF':[IPF]})], sort=False)
                #print(ipf_data)
            elif (no_ipfs==2):
                ipf_data = pd.concat([ipf_data,pd.DataFrame({'Pers.No.':[emplyee], 'yr2IPF':[nemplyee_IPF['1.pnt'].iloc[0]],\
                                                             'yr3IPF':[nemplyee_IPF['1.pnt'].iloc[1]]})], sort=False)       
            elif (no_ipfs==1):
                ipf_data = pd.concat([ipf_data,pd.DataFrame({'Pers.No.':[emplyee], 'yr3IPF':[nemplyee_IPF['1.pnt'].iloc[0]]})], sort=False)
        else:
            emplyee_IPF = emplyee_IPF.tail(3)
            ipf_data = pd.concat([ipf_data,pd.DataFrame({'Pers.No.':[emplyee], 'yr1IPF':[emplyee_IPF['1.pnt'].iloc[0]],
                                                         'yr2IPF':[emplyee_IPF['1.pnt'].iloc[1]],
                                                         'yr3IPF':[emplyee_IPF['1.pnt'].iloc[2]]})], sort=False)
    return ipf_data, ipf_concat


def headroom_check(df):
    df.loc[df['headRoom']>0, 'headrmCriteria'] = "YES"
    df.loc[df['headRoom']<=0, 'headrmCriteria'] = "NO"
    return df

    
def IPF_check(df):
    df['ipfCriteria'] = "NO"
    df.loc[df['avgIPF']>=1, 'ipfCriteria'] = "YES"
    return df


def promyr_check(df):
    df['promYrCriteria'] = "NO"
    df.loc[(df['lastCEP']==1) & (df['yrsIPF']>=3), 'promYrCriteria'] = "YES"
    df.loc[(df['lastCEP']==2) & (df['yrsIPF']>=4), 'promYrCriteria'] = "YES"
    df.loc[(df['lastCEP']==3) & (df['yrsIPF']>=5), 'promYrCriteria'] = "YES"
    df.loc[(df['lastCEP']==4) & (df['yrsIPF']>=6), 'promYrCriteria'] = "YES"
    return df


def genCriteria_check(df):
    df['genCriteria'] = "NO"
    df['PS group'] = df['PS group'].apply(pd.to_numeric, errors="coerce")
    #Non operators
    df.loc[(df['sbCriteria']=="N/A") & ((df['headrmCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['promYrCriteria']=="YES")), 'genCriteria'] = "YES"
    #Operators and Techs on SG>=15
    df.loc[((df['sbCriteria']!="N/A") & (df['PS group']>=15)) & ((df['sbCriteria']=="YES") & (df['headrmCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['promYrCriteria']=="YES")), 'genCriteria'] = "YES"
    #Operators and Techs with SG>=13 and SG<15 (second condition waves headroom for SG13)
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]!="POS") & (df['Ref. Ind.'].str[:3]!="POL") & (df['PS group']>=13) & (df['PS group']<15)) & (df['sbCriteria']=="YES") & (df['headrmCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['promYrCriteria']=="YES"), 'genCriteria'] = "YES"
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]!="POS") & (df['Ref. Ind.'].str[:3]!="POL") & (df['PS group']>=13) & (df['PS group']<15)) & (df['sbCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['yrsOnSG']>=6), 'genCriteria'] = "YES"
    #Operators and Techs with SG<13
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]!="POS") & (df['Ref. Ind.'].str[:3]!="POL") & (df['PS group']<13)) & (df['sbCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['yrsOnSG']>=3), 'genCriteria'] = "YES"
    #POS staff (second condition waves headroom for staff >=13 and <15)
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]=="POS")) & (df['sbCriteria']=="YES") & (df['headrmCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['promYrCriteria']=="YES"), 'genCriteria'] = "YES"  
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]=="POS") & (df['PS group']>=13) & (df['PS group']<15)) & (df['sbCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['yrsOnSG']>=6), 'genCriteria'] = "YES"
    #POL staff with SG<13 
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]=="POL") & (df['PS group']<13)) & (df['sbCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['yrsOnSG']>=3), 'genCriteria'] = "YES"
    #POL staff with SG=13 (second condition waves headroom for staff >=13 and <15)
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]=="POL") & (df['PS group']==13)) & (df['sbCriteria']=="YES") & (df['headrmCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['promYrCriteria']=="YES"), 'genCriteria'] = "YES"
    df.loc[((df['sbCriteria']!="N/A") & (df['Ref. Ind.'].str[:3]=="POL") & (df['PS group']==13) & (df['PS group']>=13) & (df['PS group']<15)) & (df['sbCriteria']=="YES") & (df['ipfCriteria']=="YES") & (df['yrsOnSG']>=6), 'genCriteria'] = "YES"
    return df  

def sConsider_check(ipf_raw, ipf_data, df, df_all):
    emplyees = ipf_raw['Pers.No.'].unique().tolist()    
    sCons = pd.DataFrame()
    for emplyee in emplyees:
        IPF_yrs = ipf_raw.loc[ipf_raw['Pers.No.']==emplyee].drop('Pers.No.', axis=1)
        IPF_yrs = IPF_yrs.apply(pd.to_numeric, errors="coerce").dropna(axis=1)
        #print("promo yr = {}, IPF years = {}, len IPF = {}".format(promYr, IPF_yrs.columns, len(IPF_yrs.columns)))
        #if len(IPF_yrs.columns)>=6:
        try:
            promYr = df['promYr'].loc[emplyee]
            IPF_yrs = (pd.to_numeric(IPF_yrs.columns)>=promYr).sum()      
            staff_sg = df_all['PS group'].loc[emplyee]
            avg3yrsIPF = ipf_data['avgIPF'].loc[emplyee]
            hdrm_emplyee = df_all['headrmCriteria'].loc[emplyee]
            cep_emplyee = df_all['lastCEP'].loc[emplyee]
            #print(emplyee, staff_sg, ", ", avg3yrsIPF, ", ", hdrm_emplyee)
            if (avg3yrsIPF>=0.96) & (hdrm_emplyee=="YES") & (IPF_yrs>=6) & (int(staff_sg)<16) & ((cep_emplyee!=4) or ((cep_emplyee==4) & IPF_yrs>6)):
                sCons = pd.concat([sCons,pd.DataFrame({'Pers.No.':[emplyee],'yrsIPF':IPF_yrs,'sConsider':"YES"})], sort=False)
            else:
                sCons = pd.concat([sCons,pd.DataFrame({'Pers.No.':[emplyee], 'yrsIPF':IPF_yrs,'sConsider':"N/A"})], sort=False)
        except:
            continue           
    return sCons

def mod_columnTitles(df):
    df = df.rename_axis(None, axis=1).rename_axis("persNo", axis=0)
    df = df.rename(columns={"Date of Action":"actionDate","Employee Name":"persName",\
                            "Personnel Area":"persArea","Employee Group":"empGroup","Employee Subgroup":"empSubgroup",\
                            "Personnel Subarea":"persSubarea","Organizational Unit":"orgUnit","Position":"persPosition",\
                            "Ref. Ind.":"refIndic","Dept.":"dept","Div.":"div","PS group":"psGroup","Date Employed":"dateEmployed",\
                            "Gender":"genderKey","State":"persState","Nationality":"persNation","Religious Denom.":"relDenom",\
                            "Marital Status Key":"maritalStatus","Age of employee":"empAge","Employment Status":"empStatus",\
                            "Years":"empYears","Action Type":"actionType","Reason for Action":"actionReason","Birth date":"birthDate",\
                            "No.ch":"noCh","Curr.":"salCurr","GeoPolitical Zone":"geoZone","Loc":"geoLoc","LGA text":"lgaText",\
                            "Work Schedule Rule":"workRule","PArea":"pArea","Cost Ctr":"costCtr","Cost Center":"costCenter"})
    return df
    
     
def write_log(success, error):
    with open(root_folder + '\log_file.txt', 'w') as f:
        curr_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        if success:
            log_text = "Last updated : " + curr_time
        else:
            log_text = error
        text = ["Success : " + str(success) + "\n", "Last run : " + curr_time + "\n", log_text]
        f.writelines(text)
        f.close()
    

def main():
    success, error, CEPspool_file, IPFspool_file, AP_ops_file, AP_tech_file, Staffspool_file, Promotspool_file, Output_file = config_read()
    data_processed = pd.DataFrame()
    if success:
        try:
            #read all files
            text = "CEP data file"
            CEP_data = pd.read_csv(root_folder + '/data_dump/' + CEPspool_file)
            CEP_data = CEP_data[['Staff ID','CEP']]                                    #Retaining only Staff ID and Potential (CEP)
            CEP_data = CEP_data.rename(columns={'Staff ID':'Pers.No.','CEP':'lastCEP'})
            
            text = "A&P data file"
            AP_ops = pd.read_csv(root_folder + '/data_dump/' + AP_ops_file)
            AP_tech = pd.read_csv(root_folder + '/data_dump/' + AP_tech_file)
            
            """
            print("")
            print("********************A&P Data********************")
            print(AP_tech.head(15))
            """
            
            text = "Promotion date data file"
            PromoDate_data = pd.read_csv(root_folder + '/data_dump/' + Promotspool_file)
            
            text = "Staff data file"
            Staff_data = pd.read_csv(root_folder + '/data_dump/' + Staffspool_file)
            
            text = "IPF data file"
            IPF_raw = pd.read_csv(root_folder + '/data_dump/' + IPFspool_file)
            
            text = "A&P/Staff data"
            #A&P skill blocks requirement
            AP_all, success, error = APdata_process(AP_ops, AP_tech, Staff_data)
            
            """
            print("")
            print("*****Operators A&P Requirement Criteria************")
            print(AP_all)
            """
            
            if success:
                text = "Promotion date data"
                PromoDate_data = PromoDate_data[['Pers.No.','Date to Current Salary Group']]    #Retaining only Staff ID and Date to Current Position
                PromoDate_data = PromoDate_data.rename(columns={'Date to Current Salary Group':'promYr'})  
                PromoDate_data['promYr'] = pd.DatetimeIndex(pd.to_datetime(PromoDate_data['promYr'])).year
                PromoDate_data['yrsOnSG'] = datetime.datetime.now().year - PromoDate_data['promYr']
                
                #process average IPF in given time period (3 years) where applicable
                text = "Average IPF"
                IPF_data, ipf_concat = avg_ipf(IPF_raw)
                
                #process and combine all data in single file
                text = "all data"
                data_processed, success, error = data_frame(data_processed, Staff_data)
                data_processed['newSG'] = pd.to_numeric(data_processed['PS group'], errors="coerce") + 1                          #adding new salary group
                #data_processed, success, error = data_frame(data_processed, AP_all)
                data_processed, success, error = data_frame(data_processed, IPF_data)
                data_processed, success, error = data_frame(data_processed, CEP_data)
                data_processed, success, error = data_frame(data_processed, PromoDate_data)
                
                JG_codes, success, error = jg_codes()
                data_processed['jobGroup'] = data_processed['Job Group'].map(JG_codes) 
                
                
                
                data_processed['headRoom'] = pd.to_numeric(data_processed['jobGroup'], errors="coerce") - pd.to_numeric(data_processed['PS group'], errors="coerce")
                
                """
                print("")
                print("*******************Staff Data from SAP*******************")
                print(data_processed[['Personnel Name','Ref. Ind.','PS group','Job Group',]])
                """
                
                #Check promotion criteria                
                text = "promotion criteria"
                data_processed = headroom_check(data_processed)                             #head room criteria check
                data_processed = IPF_check(data_processed)                                  #IPF criteria check
                
                """
                print("")
                print("*******************IPF Criteria*********************")
                print(data_processed[['Ref. Ind.','yr1IPF','yr2IPF','yr3IPF','avgIPF','ipfCriteria']])

                print("")
                print("*******************JG Codes*********************")
                print(JG_codes)
                
                print("")
                print("*******************Headroom Criteria*********************")
                print(data_processed[['Ref. Ind.','PS group','Job Group','jobGroup','headrmCriteria']])
                """    
                
                
                data_processed, success, error = data_frame(data_processed, AP_all)        #Adding A&P criteria where applicable
                
                #processing A&P req. N/A for non operators
                data_processed.loc[(data_processed['sbCriteria'] != "YES") & (data_processed['sbCriteria'] != "NO"), 'sbCriteria'] = "N/A"
                
                """
                print("")
                print("***************All Criteria******************")
                print(data_processed[['Ref. Ind.','ipfCriteria','headrmCriteria','promYrCriteria','sbCriteria']])
                """
                
                #Special consideration
                text = "special criteria"
                sConsideration_data = sConsider_check(IPF_raw, IPF_data, PromoDate_data, data_processed[['headrmCriteria', 'PS group', 'lastCEP']])
                data_processed, success, error = data_frame(data_processed, sConsideration_data)
                
                text = "promotion yr criteria"
                data_processed = promyr_check(data_processed)                               #promYR criteria check
                
                """
                print("")
                print("*************Promotion Year Criteria*****************")
                print(data_processed[['Ref. Ind.','promYr','yrsOnSG','lastCEP','promYrCriteria']].head())
                """                
                
                #checking all criteria
                text = "checking for all criteria"
                data_processed = genCriteria_check(data_processed)
                """
                print("")
                print("*****General Criteria (yrs on SG for ops with JG<13)*****")
                print(data_processed[['Ref. Ind.','PS group','yrsOnSG','genCriteria']].head())
                
                print("")
                print("***************Special Consideration************************")
                print(data_processed[['Ref. Ind.','promYr','avgIPF','yrsIPF','headrmCriteria','sConsider']].head())
                """
                
                text = "final step of renaming columns"
                data_processed = mod_columnTitles(data_processed)
                
                text = "output files"
                data_processed = data_processed.loc[data_processed['refIndic'].notna()]
                data_processed.to_csv(root_folder + '/Eligibility_list/' + Output_file)
                data_processed.reset_index(level=0, inplace=True)
                data_processed.to_json(root_folder + '/Eligibility_list/' + Output_file[:-4] + ".json", orient='records', lines=False)
        except Exception as e:
            success = False
            error = "Error in processing " + text + "." + str(e) + ": " + error
    write_log(success, error)
    
    
if __name__=="__main__":
    main()     
